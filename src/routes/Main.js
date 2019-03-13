import React, { Component } from 'react';
import { Link } from 'react-router-dom'
//import {Login, PrivateRoute, fakeAuth, AuthButton  } from './Routes/Login'
//import Ships from './Routes/Ships'
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, ProgressBar} from "react-bootstrap";
//import { LinkContainer } from 'react-router-bootstrap';
import Routes from "./Routes";
import { Button, Icon, Popup, Grid, Container, List, Segment, Header, Divider, Transition } from 'semantic-ui-react'
import '../css/main.css'
import { fakeAuth  } from './Login'
//import me from '../pics/businessman.png';
//import { fakeAuth  } from '../Routes/Login2'
//import { Button, Container, Divider, Grid, Header, Icon, Image, List, Menu, Responsive, Segment, Sidebar, Visibility} from 'semantic-ui-react'





export default class Main extends Component {
	constructor(props) {
	    super(props)
	    this.state = {
	    	activeItem: 'home',
	    	visible: true,
	    	login: true,
	    	signup: true,
	    	talk_sports: true,
	    	games: true,
	    	movies: true,
	    	home_main: true,
	    	logged: false,
	    	username: '',
	      	out: false
	    }   
	}


	handleItemClick = (event) => {
		this.setState({ activeItem: event.currentTarget.name})
		this.setState({ [event.currentTarget.name]: !this.state[event.currentTarget.name] })
	}
	

	login = (user) => {
	    this.setState({
	      logged: true, 
	      username: user
	    })
	  }

	handleLogout = async event => {
	  //await Auth.signOut();
	  fakeAuth.signout();
	  this.setState({
	      out: true
	    })
	}



    render() {
    	//const { fixed } = this.state
    		const childProps = {
		  logged: this.state.logged,
		  login: this.login,
		  username: this.state.username
		};

		if (this.state.out === true) {
	   		return <Main />;
		}

	return (

			<React.Fragment>
			<header>
	  			<Navbar expand="lg" variant="dark" className="navbar">
		<div className="hover2">
<Transition animation='jiggle' duration='250' visible={this.state.home_main} >	 	 				
						<Navbar.Brand onClick={this.handleItemClick} name="home_main" active={this.state.activeItem ? 'home_main' : undefined} as={Link} to='/'>
	      		
	      					{' MeanIT '}
	    				</Navbar.Brand>
</Transition>
</div>					
	   
	 			<Navbar.Toggle aria-controls="basic-navbar-nav" />
	  			<Navbar.Collapse id="basic-navbar-nav">
	    			
	    			<Nav fill className="navbar-nav mx-auto" >

    				
	      				<div className="hover">
<Transition animation='jiggle' duration='250' visible={this.state.talk_sports} >
	      				<Nav.Link onClick={this.handleItemClick} name="talk_sports" active={this.state.activeItem === 'talk_sports'} className="nav-link-custom" as={Link} to='/sports'>Talk Sports</Nav.Link>
</Transition>
	      				</div>
	      				<div className="hover">
<Transition animation='jiggle' duration='250' visible={this.state.games} >
	      				<Nav.Link onClick={this.handleItemClick} name="games" active={this.state.activeItem === 'games'} className="nav-link-custom" as={Link} to='/games'>Video Games</Nav.Link>
</Transition>
	      				</div>

	      				<div className="hover">
<Transition animation='jiggle' duration='250' visible={this.state.movies} >
	      				<Nav.Link onClick={this.handleItemClick} name="movies" active={this.state.activeItem === 'movies'} className="nav-link-custom" as={Link} to='/movies'>Movies</Nav.Link>
</Transition>
	      				</div>
	    			</Nav>
	    		<Nav>

	      				{this.state.logged ? 
	      					<Nav.Link>
	              				<NavItem onClick={this.handleLogout}>Logout</NavItem>
	              			</Nav.Link>
	  						: <div className="hover">
<Transition animation='jiggle' duration='250' visible={this.state.login} >	      				
<Nav.Link onClick={this.handleItemClick} name="login" active={this.state.activeItem === 'login'} className="nav-link-custom" as={Link} to='/login'>Login</Nav.Link>
</Transition>
	      				</div>
						}

	      				<div className="hover">
<Transition animation='jiggle' duration='250' visible={this.state.signup} >	      				
<Nav.Link onClick={this.handleItemClick} name="signup" active={this.state.activeItem === 'signup'} className="nav-link-custom" as={Link} to='/signup'>Sign Up</Nav.Link>
</Transition>
	      				</div>	  

    </Nav>
	    		</Navbar.Collapse>
	  			</Navbar>

</header>
			
				<Routes childProps={childProps}/> 

<footer>
<Segment className="footer-bar" inverted vertical>
      <Container className='footer-container'>
        <Grid divided stackable className='footer-grid'>
          <Grid.Row>
            <Grid.Column width={4}>
              <Header as='h4' className='footer-header' content='Social Links' />
              

              <div className='p-footer'>
        <Popup
          trigger={<Button circular className="icons" icon='envelope outline' href="mailto:pittpir@gmail.com"/>}
          content='Email the Author! (send gifts too)'
          position='bottom left'
        />

        <Popup
          trigger={<Button circular className="icons" icon='linkedin' href="https://www.linkedin.com/in/pittpir/" target="_blank"/>}
          content='Travel to my linkedin Page'
          position='bottom left'
        />

        <Popup
          trigger={<Button circular className="icons" icon='github' href="https://github.com/pittpir" target="_blank"/>}
          content='Enter the Github Dimension Page'
          position='bottom left'
        />  
        </div>

            </Grid.Column>
            <Grid.Column width={12}>
              <Header as='h4' className='footer-header'>What is MeanIT?</Header>
              <p className='p-footer'>
                MeanIT is an off shot of reddit where users can discuss, talk, engage in various topics.  
                What ever you say you Mean IT!  You stand behind your word 110%!  


              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
</footer>




				</React.Fragment>


			


	      
	    )
	}
}