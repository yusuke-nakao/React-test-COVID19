/* import React, { useState, useEffect } from 'react';
import MapGL, {Popup, GeolocateControl, Source, Layer, NavigationControl, FullscreenControl, ScaleControl} from 'react-map-gl';
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
import Message from './component/Message';
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from './map-style.js';

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

function App(){

  const [totalInfo, SettotalInfo] = useState(null);
  const [drawerState, SetdrawerState] = useState(false);
  const [Covid19Info, SetCovid19Info] = useState(null);
  const [viewport, setViewPort ] = useState(initialViewState)
  const [popupInfo, SetpopupInfo] = useState(null);

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
    //COVID-19情報取得
    //fetch("https://covid19-japan-web-api.now.sh/api/v1/prefectures")
    fetch("https://services6.arcgis.com/5jNaHNYe2AnnqRnS/arcgis/rest/services/COVID19_JapanCaseData/FeatureServer/0/query?where=%E9%80%9A%E3%81%97%3E-1&returnIdsOnly=false&returnCountOnly=false&&f=pgeojson&outFields=*&orderByFields=%E9%80%9A%E3%81%97")
      .then(res => res.json())
      .then(
        (result) => {
          console.log("result", result);
          SetCovid19Info(result);

          //国内総合情報を取得
          GetTotalInfo();
        },
        (error) => {
          console.log(error)
        }
      )
  },[]);

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
      let dates = Covid19Info.features.map(x => {
        return x.properties.確定日YYYYMMDD;
      });
      //確定日配列から最大値を取得（UNIXタイムで取得）
      let maxDate = Math.max.apply(null,dates);
      let dateTime = new Date(maxDate).toLocaleDateString();
      
      return(
        <div className={classes.fontSize_small}>
          <div>最終更新日: {dateTime}</div>
          <div>陽性患者数: {Covid19Info.features.length}人</div>
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

  //ピンクリックイベント
  const _onClickMarker = city => {
    SetpopupInfo(city);
  };

  //ポップアップ表示処理
  function _renderPopup() {
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.geometry.coordinates[0]}
          latitude={popupInfo.geometry.coordinates[1]}
          closeOnClick={true}
          onClose={() => SetpopupInfo(null)}
        >
          <div>
            <p>id: {popupInfo.id}</p>
            <p>性別: {popupInfo.properties.性別}</p>
            <p>年齢: {popupInfo.properties.年代}</p>
            <p>居住都道府県: {popupInfo.properties.居住都道府県}</p>
            <p>受診都道府県: {popupInfo.properties.受診都道府県}</p>
          </div>
        </Popup>
      )
    );
  }

  const _onViewportChange = viewport => setViewPort({...viewport})

  //locate meクリック時のイベント
  const _onGeoLocateViewportChange = (viewport) => {
    viewport.zoom = 18
    setViewPort({...viewport})
  }

  var _sourceRef = React.createRef();

  //clusterクリック処理
  const _onClick = event => {
    try{
      const feature = event.features[0];
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

  return (
    <div className={classes.root}>
      <AppBar position="relative" color="inherit">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={toggleDrawer('left', true)}>
            <MenuIcon></MenuIcon>
          </IconButton>
          <Drawer 
            open={drawerState} 
            onClose={toggleDrawer('left', false)}>
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
      <div style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}></div>
      <MapGL
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
  )
}

export default App;
 */

import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Login from '../src/pages/Login'
import Default from './Default';

function App(){
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path='/Login' component={Login}></Route>
        <Route path='/' component={Default}></Route>
      </Switch>
    </BrowserRouter>
  )
}
export default App;