import React from 'react';
import DeckGL from '@deck.gl/react';
import {GeoJsonLayer} from '@deck.gl/layers';
import {StaticMap, Popup} from 'react-map-gl';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';

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

//style設定
const styles = {
  list:{
    width:250,
  },
  root:{
    flexGrow: 1,
  },
  menuButton:{
    marginLeft: -12,
    marginRight: 20,
  },
  totalDiv:{
    marginLeft: 'auto',
  }
};

class App extends React.Component{
  //コンストラクター
  constructor(props){
    super(props);
    this.state = {
      geojsonPoint:null,
      totalInfo:null,
      left: false,
    };
  }

  toggleDrawer = (side, open) =>()=>{
    this.setState({
      [side]: open,
    });
  };

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
          //国内総合情報を取得
          this.GetTotalInfo();
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

  //国内総合情報を取得
  GetTotalInfo(){
    fetch("https://covid19-japan-web-api.now.sh/api/v1/total")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            totalInfo: result
          });
          console.log("TotalInfo result", result);
        },
        (error) => {
          console.log(error)
        }
      )
  }

  //国内総合情報を表示
  _DispTotalInfo(){
    this.DateConvert();
    if(this.state.totalInfo !== null){
      return(
        <div>
          <p>最終更新日: {this.DateConvert(this.state.totalInfo.date)}</p>
          <p>陽性患者数: {this.state.totalInfo.positive}人</p>
          {/* <p>-症状あり: {this.state.totalInfo.symptom}人</p>
          <p>-症状なし: {this.state.totalInfo.symptomless}人</p>
          <p>-症状確認中: {this.state.totalInfo.symptomConfirming}人</p> */}
        </div>
      )
    }
  }

  //日時変換
  DateConvert(date){
    if(date !== null){
      let val = String(date);
      return val.substr(0,4) + '/' + val.substr(4,2) + '/' + val.substr(6,2);
    }
  }

  //レンダリング用メソッド
  render(){
    const { classes } = this.props;

    //サイドバー表示用
    const sideList=(
      <div className={classes.list}>
        <List>
          <ListItem button>
            <ListItemText primary="Home"></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText primary="About"></ListItemText>
          </ListItem>
        </List>
      </div>
    );

    //コンストラクターで取得したGeoJsonをセット
    const totalinfo = this.state.totalInfo;
    const geojsonPoint = this.state.geojsonPoint;
    console.log("geojsonPoint: ",geojsonPoint);
    console.log("totalInfoaaaaaaa",totalinfo);
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
        <div className={classes.root}>
          <AppBar position="relative" color="inherit">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer('left', true)}>
                <MenuIcon></MenuIcon>
              </IconButton>
              <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                <div
                  tabIndex={0}
                  role="button"
                  onClick={this.toggleDrawer('left', false)}
                  onKeyDown={this.toggleDrawer('left', false)}>
                  {sideList}
                </div>
              </Drawer>
                COVID-19 Japan
              <div className={classes.totalDiv}>
                {this._DispTotalInfo()}
              </div>
            </Toolbar>

          </AppBar>
        </div>
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

App.propTypes={
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App);
