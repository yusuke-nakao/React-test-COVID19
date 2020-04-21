import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';

import Home from '../src/pages/Home';
import About from '../src/pages/About';
import Service from '../src/pages/Service'

export const HeaderInfoContext = React.createContext(null);

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

function Default(){
  const [drawerState, SetdrawerState] = useState(false);
  const classes = useStyles();
  const [Covid19Info, SetCovid19Info] = useState(null);
  const headerInfo = useCallback((info) => {
    SetCovid19Info(info)
  });

  useEffect(() =>{
  },[]);

  //サイドバー表示用
  const sideList=(
    <div className={classes.list}>
      <List>
        <ListItem button>
          <Link to="/Home">Home</Link>
        </ListItem>
        <ListItem button>
          <Link to="/About">About</Link>
        </ListItem>
        <ListItem button>
          <Link to="/Service">Service</Link>
        </ListItem>
      </List>
    </div>
  );

  const toggleDrawer = (side, open) =>()=>{
    SetdrawerState(open);
  };

  //国内総合情報を表示
  function _DispTotalInfo(info){
    console.log("test", info);
    if(info !== undefined && info !== null){
      let dates = info.features.map(x => {
        return x.properties.確定日YYYYMMDD;
      });
      //確定日配列から最大値を取得（UNIXタイムで取得）
      let maxDate = Math.max.apply(null,dates);
      let dateTime = new Date(maxDate).toLocaleDateString();
      
      return(
        <div className={classes.fontSize_small}>
          <div>最終更新日: {dateTime}</div>
          <div>陽性患者数: {info.features.length}人</div>
        </div>
      )
    }
  }

  return(
    <HeaderInfoContext.Provider value={{headerInfo}}>
    <div className={classes.root}>
      <BrowserRouter>
        <AppBar position="relative" color="primary">
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
              {_DispTotalInfo(Covid19Info)}
            </div>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path='/'><Home/></Route>
          <Route path='/Home'><Home/></Route>
          <Route path='/About'><About/></Route>
          <Route path='/Service'><Service/></Route>
        </Switch>
      </BrowserRouter>
    </div>
    </HeaderInfoContext.Provider>
  )
}

export default Default;