import React from 'react';
import DeckGL from '@deck.gl/react';
import {GeoJsonLayer} from '@deck.gl/layers';
import {StaticMap, Popup} from 'react-map-gl';
import './App.css';

//MapBoxへのアクセストークン
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoieXVzdWtlZWVlZWU1NSIsImEiOiJjazhudGpiczgxMmN5M2dxb3FyMTBvZGUwIn0.4rGM-WGp5mEoCdGQDHEYLA';

// 地図上の初期表示位置を指定
const initialViewState = {
  longitude: 139.7212733,
  latitude: 35.6606213,
  zoom: 8,
  pitch: 45,
  bearing: 0
};

class App extends React.Component{
  //コンストラクター
  constructor(props){
    super(props);
    this.state = {
      geojsonPoint:null,
    };
  }

  //コンポーネントがマウントされてから動作するメソッド
  //APIにアクセスしデータを取得する
  componentDidMount(){
    fetch("https://covid19-japan-web-api.now.sh/api/v1/prefectures")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            geojsonPoint: this.makeGeoJson(result)
          });
          console.log("result", result);
        },
        (error) => {
          console.log(error)
        }
      )
  }

  makeGeoJson(data){
    let retJson = {
      type:"FeatureCollection",
      features: []
    };
    
    data.forEach(el => {
      let val = {
        id: el.id,
        type: "Feature",
        geometry:{
          type: "Point",
          coordinates: [
            el.lng, el.lat
          ] 
        },
        properties:{
          id: el.id,
          name: el.name_ja,
          lat: el.lat,
          lng: el.lng,
          cases: el.cases,
          deaths: el.deaths
        }
      }
      retJson.features.push(val);
    });

    console.log("retJson", retJson);
    return retJson;
  }

  //ポップアップ表示メソッド
  _renderTooltip(){
    const {hoveredObject} = this.state || {};
    console.log("hoveredObject", hoveredObject);

    if(hoveredObject !== undefined){
      return(
        <Popup
          longitude={hoveredObject.geometry.coordinates[0]}
          latitude={hoveredObject.geometry.coordinates[1]}>
          <div>
            <p>id: {hoveredObject.properties.id}</p>
            <p>場所: {hoveredObject.properties.name}</p>
            <p>感染数: {hoveredObject.properties.cases}人</p>
            <p>死者数: {hoveredObject.properties.deaths}人</p>
          </div>
        </Popup>
      )
    }
  }

  //レンダリング用メソッド
  render(){
    //コンストラクターで取得したGeoJsonをセット
    const geojsonPoint = this.state.geojsonPoint;
    console.log("geojsonPoint: ",geojsonPoint);
    const layers = [
      new GeoJsonLayer({
        //任意のid
        id: 'Point_layer',
        //GeoJsonを指定
        data: geojsonPoint,
        //pointの半径
        getRadius: d => 4000,
        //地物のカラーをRGBaで指定
        //aは透過度で0～255から指定
        getFillColor: d => [245,36,36,150],
        pickable: true,
        //地物にホバーした時に発生するイベント
        //stateを更新する
        onHover: info => this.setState({
          hoveredObject: info.object,
        })
      }),
    ];

    return(
      <>
      <DeckGL
        initialViewState={initialViewState}
        controller={true}
        layers={layers}
      >
        <StaticMap
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}>
          {this._renderTooltip()}
        </StaticMap>
      </DeckGL>
      </>
    );
  }
}

export default App;
