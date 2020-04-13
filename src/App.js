import React, { useState, useEffect } from 'react';
import MapGL, {Popup, GeolocateControl} from 'react-map-gl';
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
import Pins from './pins';
import Message from './component/Message';

//MapBoxへのアクセストークン
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoieXVzdWtlZWVlZWU1NSIsImEiOiJjazhudGpiczgxMmN5M2dxb3FyMTBvZGUwIn0.4rGM-WGp5mEoCdGQDHEYLA';

const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10
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
  zoom: 8,
  //地図の傾斜
  pitch: 45
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
    fetch("https://covid19-japan-web-api.now.sh/api/v1/prefectures")
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
          longitude={popupInfo.lng}
          latitude={popupInfo.lat}
          closeOnClick={true}
          onClose={() => SetpopupInfo(null)}
        >
          <div>
            <p>id: {popupInfo.id}</p>
            <p>場所: {popupInfo.name}</p>
            <p>感染数: {popupInfo.cases}人</p>
            <p>死者数: {popupInfo.deaths}人</p>
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

  return (
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
      <div style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}></div>
      <MapGL
        {...viewport}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={_onViewportChange}
      >
        <Pins data={Covid19Info} onClick={_onClickMarker}/>
        {_renderPopup()}

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
