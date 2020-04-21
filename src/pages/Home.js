import React, { useState, useEffect, useContext } from 'react';
import MapGL, { GeolocateControl, Source, Layer, NavigationControl, FullscreenControl, ScaleControl} from 'react-map-gl';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from '../map-style.js';
import { HeaderInfoContext } from '../Default';

//MapBoxへのアクセストークン
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoieXVzdWtlZWVlZWU1NSIsImEiOiJjazhudGpiczgxMmN5M2dxb3FyMTBvZGUwIn0.4rGM-WGp5mEoCdGQDHEYLA';

const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10
};

const fullscreenControlStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

const navStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};

const scaleControlStyle = {
  position: 'absolute',
  bottom: 36,
  left: 0,
  padding: '10px'
};

// 地図上の初期表示位置を指定（初期位置は東京）
const initialViewState = {
  width: "100%",
  height: 900,
  //経度
  longitude: 139.7212733,
  //緯度
  latitude: 35.6606213,
  //拡大
  zoom: 7,
  bearing: 0,
  //地図の傾斜
  pitch: 0
};

//style設定
const useStyles = makeStyles({
  list:{
    width:200,
  },
  root:{
    flexGrow: 1,
  },
  menuButton:{
    marginLeft: -12,
    marginRight: 0,
  },
  totalDiv:{
    marginLeft: 'auto',
  },
  fontSize_small:{
    fontSize:"12px",
  }
});

function Home(){
  const [Covid19Info, SetCovid19Info] = useState(null);
  const [viewport, setViewPort ] = useState(null);
  const { headerInfo } = useContext(HeaderInfoContext);

  const classes = useStyles();

  //コンポーネントがマウントされてから動作するメソッド
  //APIにアクセスしデータを取得する
  useEffect(() =>{
    //COVID-19情報取得
    fetch("https://services6.arcgis.com/5jNaHNYe2AnnqRnS/arcgis/rest/services/COVID19_JapanCaseData/FeatureServer/0/query?where=%E9%80%9A%E3%81%97%3E-1&returnIdsOnly=false&returnCountOnly=false&&f=pgeojson&outFields=*&orderByFields=%E9%80%9A%E3%81%97")
      .then(res => res.json())
      .then(
        (result) => {
            console.log("result", result);
            SetCovid19Info(result);
            headerInfo(result);
        },
        (error) => {
            console.log("fetchエラー",error)
        }
      )
  },[]);

  const _onViewportChange = viewport => setViewPort({...viewport})

  //locate meクリック時のイベント
  const _onGeoLocateViewportChange = (viewport) => {
    console.log("viewport",viewport)
    viewport.zoom = 18
    setViewPort({...viewport})
  }

  var _sourceRef = React.createRef();

  //clusterクリック処理
  const _onClick = event => {
    try{
      const feature = event.features[0];
      console.log("feature",feature);
      const clusterId = feature.properties.cluster_id;
      console.log("clusterId",clusterId)

      const mapboxSource = _sourceRef.current.getSource();

      mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) {
          return;
        }

        _onViewportChange({
          ...viewport,
          longitude: feature.geometry.coordinates[0],
          latitude: feature.geometry.coordinates[1],
          zoom,
          transitionDuration: 500
        });
      });
    }
    catch(e){
      console.log("e = ",e.message);
      return;
    }
  };

  //Mapロードしたらviewport設定
  const _onMapLoad = event =>{
    console.log("mapロード",event.type);
    setViewPort(initialViewState);
  }

  return (
    <div className={classes.root}>
      <div style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}></div>
      <MapGL
        onLoad={_onMapLoad}
        {...viewport}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11?optimize = true"
        interactiveLayerIds={[clusterLayer.id]}
        onViewportChange={_onViewportChange}
        onClick={_onClick}
      >
        <Source 
          type="geojson" 
          data={Covid19Info}
          cluster={true}
          clusterMaxZoom={18}
          clusterRadius={50}
          ref={_sourceRef}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
        <div style={fullscreenControlStyle}>
          <FullscreenControl />
        </div>
        <div style={navStyle}>
          <NavigationControl />
        </div>
        <div style={scaleControlStyle}>
          <ScaleControl />
        </div>

        <GeolocateControl
          onViewportChange={_onGeoLocateViewportChange}
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />
      </MapGL>
    </div>
  );
}

export default Home;
