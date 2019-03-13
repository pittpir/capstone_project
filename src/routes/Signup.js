import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import { Form, Container, Button, Grid, Segment } from 'semantic-ui-react'
import "semantic-ui-css/semantic.min.css";
import '../css/signup.css';

export default class Signup extends Component {
  state = {
    redirectToReferrer: false,
    email: '',
    username: '',
      password: '',
      formErrors: {username: '', password: ''},
      emailError: false,
      usernameError: false,
      isSignedUp: false,
      passwordError: false
  };

  handleChange = (event) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let error = 0;
    let emailValid = 0;
    let passwordValid = 0;
     
      if (! this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
          error = 1;
          console.log("email error")
      }
          //fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        
      if (this.state.password.length < 6) {
          error = 1;
          console.log("password error")
      }
          //fieldValidationErrors.password = passwordValid ? '': ' is too short';
         
    if (error) {
      this.setState({
        emailError: true,
        passwordError: true
      })
    } else {  
      this.Signup_now()   
    }
  }



	Signup_now = async () => {

      let newobj = {
            "email": this.state.email,
            "username": this.state.username,
            "password": this.state.password,
          }  


      const options = {
          method: 'post',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          }, 
          body: JSON.stringify(newobj)
          
      } 
//      let url = `https://swgoh.gg/api/player/${code}/?format=json`
//      let req = new Request(url); 
      let returnData = "";
      returnData = await fetch("http://localhost:4000/login/set",options);
      //console.log(returnData)

      this.setState({
        email: '',
    	username: '',
      	password: '',
      	isSignedUp: true,
      	emailError: false,
        passwordError: false
      })



	}





  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer, email, password, username } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className='signup_page'>

{this.state.isSignedUp ? <h2>Successful Signup</h2>
        : <h3>You must Sign Up and Login to Post Content</h3>

    }
 
         <Container>
            <Grid>
            <Grid.Row centered>
              <Grid.Column width={6}>

  <Form onSubmit={this.handleSubmit}>
            <Form.Input 
              error={this.state.usernameError}
              autoComplete="off"
              label="Username" 
              type="text" 
              placeholder='Username' 
              name="username" 
              value={username} 
              onChange={this.handleChange} />

            <Form.Input 
              error={this.state.emailError}
              autoComplete="on"
              label="Email" 
              type="email" 
              placeholder='Email' 
              name="email" 
              value={email} 
              onChange={this.handleChange} />
              
            <Form.Input
              error={this.state.passwordError} 
              label="Password" 
              type="password" 
              placeholder='Password' 
              name="password" 
              value={password} 
              onChange={this.handleChange} />
 <Segment basic textAlign='center'>          
    <Button type='submit' color='blue'>Submit</Button></Segment>  
  </Form>
  </Grid.Column>
  </Grid.Row>
  </Grid>
         </Container>      
      </div>
    );
  }
}



export {
    
}
