
import '../css/home.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import { Form, Container, Button, Grid, Segment } from 'semantic-ui-react'
import "semantic-ui-css/semantic.min.css";


export default class Home extends Component {
	constructor(props) {
		super(props)

}

   

  render() {

            return (
     
   <div className="home_page">
    <h3>Home Page!</h3>
    {this.props.username ? 
    <div>
    <h3>You are logged in as: {this.props.username}</h3>
    <h3>You are free to post to the boards</h3>
    </div>
    : <div></div>
	}
  </div>
   
)

}

}


//react-facebook-login




