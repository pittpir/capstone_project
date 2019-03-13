import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import { Form, Container, Button, Grid, Segment } from 'semantic-ui-react'
import "semantic-ui-css/semantic.min.css";
import '../css/login.css';

export default class Login extends Component {
  state = {
    redirectToReferrer: false,
    username: '',
    isAuthenticated: false,
      password: '',
      formErrors: {username: '', password: ''},
      passwordError: false
  };

  handleChange = (event) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let error = 0;
    
    let passwordValid = 0;
     
//      if (! this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
//          error = 1;
//          console.log("email error")
//      }
          //fieldValidationErrors.email = emailValid ? '' : ' is invalid';
      

      if (this.state.password.length < 4) {
          error = 1;
          console.log("password error")
      }
          //fieldValidationErrors.password = passwordValid ? '': ' is too short';
         
    if (error) {
      this.setState({
        passwordError: true
      })
    } else {  
      
     await this.login()


      




      //this.login()
//      this.props.login()   //this goes back to main -- so do not call this yet
    }
  }

 login = async () => {
    let data = ""
    try {
      //console.log("sdfsdfds")
      //const body = { username: this.state.email, password: this.state.password }
      const body = `username=${this.state.username}&password=${this.state.password}`
      const options = {
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
          body: body             
      } 
//      let url = `https://swgoh.gg/api/player/${code}/?format=json`
//      let req = new Request(url); 


      let returnData = "";
      returnData = await fetch('http://localhost:4000/login/c',options);
      //returnData = await fetch(`https://swgoh.gg/api/ships/?format=json`, { mode: 'no-cors'});
      //const response = await (fetch(req));
      //const data = await response.json();
      data = await returnData.text();
      console.log(data);
      //this.setState({ships: data, saved_ships_list: data });

    }
    catch(err) {
      console.log("Error found", err.name, err.message)

    }

    if (data === 'good') {
      this.setState({
        redirectToReferrer: false,
        isAuthenticated: true
      })
      this.props.login(this.state.username)   //this goes back to main -- so do not call this yet

    }else {
      this.setState({
        isAuthenticated: false,
        redirectToReferrer: true
      })

      
    }
    



//    fakeAuth.authenticate(() => {
//        redirectToReferrer: true
//      })
//    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer, username, password, isAuthenticated } = this.state;

    if (redirectToReferrer) {
      return <Redirect to='/login_bad' />;
    }

    if (isAuthenticated) {
      return <Redirect to='/' />;
    }

    return (
      <div className='login_page'>
        <p>You must log in to Post Content</p>
         <Container>
            <Grid>
            <Grid.Row centered>
              <Grid.Column width={6}>

  <Form onSubmit={this.handleSubmit}>
            <Form.Input 
              error={this.state.emailError}
              autoComplete="on"
              label="Username" 
              type="text" 
              placeholder='Username' 
              name="username" 
              value={username} 
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

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const PrivateRouteB = ({ component: Component, props:cProps, ...rest }) => (
 
  <Route {...rest} render={props => <Component {...props} {...cProps} />} />

);

const PrivateRouteC = ({ component: Component, props:{...cProps}, ...rest }) => (
  //console.log(cProps),
  <Route {...rest} render={props => <Component {...props} {...cProps} />} />

);

const PrivateRoute = ({ component: Component, props:cProps, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      this.state.isAuthenticated ? (
        <Component {...props} {...cProps}/>
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export {
    PrivateRoute,
    PrivateRouteB,
    PrivateRouteC,
    fakeAuth,
    Login
}







/*

            <Form.Input 
              error={this.state.emailError}
              autoComplete="on"
              label="Email" 
              type="email" 
              placeholder='Email' 
              name="email" 
              value={email} 
              onChange={this.handleChange} />




*/