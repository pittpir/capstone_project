import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Sports from "./sports";
import GamesTitles from "./gamesTitles";
import MoviesTitles from "./moviesTitles";
import Signup from "./Signup";
//import Stats from "./Stats";
//import Login from "./Login2";
import NotFound from "./Notfound";
import {Login, PrivateRoute, PrivateRouteB, PrivateRouteC} from './Login'
import Movies from './movies'
import Games from './games'
//import Login from "./Login";
//import {Login, PrivateRoute, PrivateRouteB  } from './Login2'
//import { Card, Icon, Image } from 'semantic-ui-react'


export default ({childProps}) =>
  
  <Switch>
    <PrivateRouteB path="/" exact component={Home} props={childProps}/>
    <Route path="/sports" exact component={Sports} />
    <PrivateRouteB path="/movies" exact component={MoviesTitles} props={childProps}/>
    <PrivateRouteB path="/movies/:topicId" component={Movies} props={childProps}/>
    <PrivateRouteB path="/games" exact component={GamesTitles} props={childProps}/>
    <PrivateRouteB path="/games/:topicId" component={Games} props={childProps}/>
    
    <PrivateRouteB path="/login" component={Login} props={childProps} />
    <Route path="/signup" component={Signup} />
    <Route component={NotFound} />  
  </Switch>;


  /*


  
<Route path="/movies/:topicId" render={()=><Movies num="2" someProp={100}/>}/>
  */