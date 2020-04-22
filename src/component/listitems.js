import React from 'react';
import {Link} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { ListItemIcon } from '@material-ui/core';

//Icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MapIcon from '@material-ui/icons/Map';

//サイドバーに表示するリスト
export const mainListItems = (
    <div>
        <ListItem button component={Link} to={'/Map'}>
            <ListItemIcon>
                <MapIcon/>
            </ListItemIcon>
            <ListItemText primary='Map'/>
        </ListItem>
        <ListItem button component={Link} to={'/Chart'}>
            <ListItemIcon>
                <BarChartIcon/>
            </ListItemIcon>
            <ListItemText primary='Chart'/>
        </ListItem>
        <ListItem button component={Link} to={'/Reports'}>
            <ListItemIcon>
                <PeopleIcon/>
            </ListItemIcon>
            <ListItemText primary='Reports'/>
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary='Dashboard'/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ShoppingCartIcon/>
            </ListItemIcon>
            <ListItemText primary='Shopping'/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <LayersIcon/>
            </ListItemIcon>
            <ListItemText primary='Layers'/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary='Assignment'/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <NotificationsIcon/>
            </ListItemIcon>
            <ListItemText primary='Notifications'/>
        </ListItem>
    </div>
);