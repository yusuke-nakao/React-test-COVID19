import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import { ListItemIcon, Divider, CssBaseline } from '@material-ui/core';

//components
import Map from '../src/pages/Map';
import Chart from '../src/pages/Chart';
import Reports from '../src/pages/Reports'
import { mainListItems,secondaryListItems } from './component/listitems'


//Icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MapIcon from '@material-ui/icons/Map';
import { theme } from './theme';

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
  },
  toolbarIcon:{
    display:'flex',
    alignItems: 'center',
    justifyContent:'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  }
});

function Default(){
  const [drawerState, SetdrawerState] = useState(false);
  const classes = useStyles();
  const [Covid19Info, SetCovid19Info] = useState(null);
  const headerInfo = useCallback((info) => {
    SetCovid19Info(info)
  });

  const toggleDrawer = (side, open) =>()=>{
    SetdrawerState(open);
  };

  //国内総合情報を表示
  function _DispTotalInfo(info){
    //infoがnullなら表示しない
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
      <CssBaseline/>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <AppBar position="relative">
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
                <div className={classes.toolbarIcon}>
                  <IconButton onClick={toggleDrawer('left', false)}>
                    <ChevronLeftIcon/>
                  </IconButton>
                </div>
                <Divider/>
                <List className={classes.list}>
                  {mainListItems}
                </List>
                <Divider/>
                <List className={classes.list}>
                  {secondaryListItems}
                </List>
              </div>
            </Drawer>
              COVID-19 Map
            <div className={classes.totalDiv}>
              {_DispTotalInfo(Covid19Info)}
            </div>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path='/Map'><Map/></Route>
          <Route path='/Chart'><Chart/></Route>
          <Route path='/Reports'><Reports/></Route>
          <Route exact path='/'><Map/></Route>
          <Route path=''><Redirect to={'/Map'}/></Route>
        </Switch>
      </BrowserRouter>
    </div>
    </HeaderInfoContext.Provider>
  )
}

export default Default;