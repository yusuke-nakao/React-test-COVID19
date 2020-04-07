import React, { useState, useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import {GeoJsonLayer} from '@deck.gl/layers';
import {StaticMap, Popup} from 'react-map-gl';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';

//MapBoxへのアクセストークン
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoieXVzdWtlZWVlZWU1NSIsImEiOiJjazhudGpiczgxMmN5M2dxb3FyMTBvZGUwIn0.4rGM-WGp5mEoCdGQDHEYLA';

// 地図上の初期表示位置を指定（大阪）
const initialViewState = {
  longitude: 135.497009,
  latitude: 34.669529,
  zoom: 8,
  pitch: 45,
  bearing: 0
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

function App(){

  const [totalInfo, SettotalInfo] = useState(null);
  const [drawerState, SetdrawerState] = useState(false);
  const [hoveredObject, SethoveredObject] = useState(undefined);
  const [layers, Setlayers] = useState(null);

  const toggleDrawer = (side, open) =>()=>{
    SetdrawerState(open);
  };

  const classes = useStyles();

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

  //コンポーネントがマウントされてから動作するメソッド
  //APIにアクセスしデータを取得する
  useEffect(() =>{
    fetch("https://covid19-japan-web-api.now.sh/api/v1/prefectures")
      .then(res => res.json())
      .then(
        (result) => {
          console.log("result", result);

          let layer = new GeoJsonLayer({
              //任意のid
              id: 'Point_layer',
              //GeoJsonを指定
              data: makeGeoJson(result),
              //pointの半径
              getRadius: d => 4000,
              //地物のカラーをRGBaで指定
              //aは透過度で0～255から指定
              getFillColor: d => [245,36,36,150],
              pickable: true,
              //地物にホバーした時に発生するイベント
              //stateを更新する
              onHover: info => SethoveredObject(info.object)
            });
          Setlayers(layer);
          //国内総合情報を取得
          GetTotalInfo();
        },
        (error) => {
          console.log(error)
        }
      )
  },[]);

  //APIから取得したJSONデータをGeoJsonフォーマットに変換
  function makeGeoJson(data){
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

  //ポップアップ表示用関数
  function _renderTooltip(){
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
function GetTotalInfo(){
  fetch("https://covid19-japan-web-api.now.sh/api/v1/total")
    .then(res => res.json())
    .then(
      (result) => {
        SettotalInfo(result);
        console.log("TotalInfo result", result);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  //国内総合情報を表示
  function _DispTotalInfo(){
    if(totalInfo !== null){
      return(
        <div className={classes.fontSize_small}>
          <div>最終更新日: {DateConvert(totalInfo.date)}</div>
          <div>陽性患者数: {totalInfo.positive}人</div>
        </div>
      )
    }
  }

  //日時変換
  function DateConvert(date){
    if(date !== null){
      let val = String(date);
      return val.substr(0,4) + '/' + val.substr(4,2) + '/' + val.substr(6,2);
    }
  }

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
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={toggleDrawer('left', true)}>
              <MenuIcon></MenuIcon>
            </IconButton>
            <Drawer open={drawerState} onClose={toggleDrawer('left', false)}>
              <div
                tabIndex={0}
                role="button"
                onClick={toggleDrawer('left', false)}
                onKeyDown={toggleDrawer('left', false)}>
                {sideList}
              </div>
            </Drawer>
              COVID-19 Map
            <div className={classes.totalDiv}>
              {_DispTotalInfo()}
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <StaticMap
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}>
        {_renderTooltip()}
      </StaticMap>
    </DeckGL>
    </>
  );
}

export default App;
