import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Login from '../src/pages/Login'
import Default from './Default';

function App(){
  return(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path='/Login'><Login/></Route>
        <Route exact path='/'><Default/></Route>
        <Route path=''><Default/></Route>
      </Switch>
    </BrowserRouter>
  )
}
export default App;