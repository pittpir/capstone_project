import React, { Component } from 'react';
import { Button, Comment, Form, Header, Container, Grid } from 'semantic-ui-react'
import '../css/games.css'
import GamesTitleList from './gamesTitlesList'
import Routes from "./Routes";
import pubg_image_long from "../pics/pubg_long.png"
import pubg_image_square from "../pics/pubg.jpg"
import pubg_long_banner from "../pics/pubg_long_banner.jpg"


export default class GamesTitles extends Component {
	constructor(props) {
		super(props)

		this.state ={
			texttitle: '',
      textarea: '',
			gamesTitle: [
			{
				title: "Avengers",
				id: 0
			},
				{
				title: "Snow White",
        id: 1
			},




				]
		}
	}

handleOnChange = (event) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

	handleOnSubmit = async (event) => {
    	event.preventDefault();
    	//console.log(this.state.texttitle)
    	let obj = {
    		title: this.state.texttitle,
    		id: 2,
    	}
    	let newarray = this.state.gamesTitle;
    	newarray.push(obj)

      let today = new Date().toLocaleDateString()

      let newobj = {
            "title": this.state.texttitle,
            "author": this.props.username,
            "message": this.state.textarea,
            "date": today
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
      //returnData = await fetch('http://localhost:4000/games/set',options);
      returnData = await fetch('/games/set',options);
      //console.log(returnData)

      this.setState({
        texttitle: '',
        textarea:''

      })

      this.getMovieTitles()
	}
	
	//updateDog = (index,item)
	handleReply = async (index,stats) => {
    	//event.preventDefault();
    	//console.log(index)
    	let obj = stats;
    	obj.isComment = true;
		
		let newarray = this.state.games;
    	newarray.splice(index,1,obj)

		this.setState({
    		gamesTitle: newarray,
    		textarea: ''

    	})


 	}
  

getMovieTitles = async () => {
    try {

      const options = {
          method: 'get',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },          
          
      } 
//      let url = `https://swgoh.gg/api/player/${code}/?format=json`
//      let req = new Request(url); 
      let returnData = "";
      //returnData = await fetch('http://localhost:4000/games/get');
      returnData = await fetch('/games/get');
      //returnData = await fetch(`https://swgoh.gg/api/ships/?format=json`, { mode: 'no-cors'});
      //const response = await (fetch(req));
      //const data = await response.json();
      const data = await returnData.json();
      //console.log(data);
      //data.data.rank2 = data.data.fleet_arena.rank
      //this.setState({stats: data.data});
     

      //this.setState({quakes: data.features});
      //console.log(data.data.fleet_arena.rank)
      //console.log(...data.features[0].geometry.coordinates)
      //greatPlaceCoords: {lat: 31.2682, lng: -96.74295}

      let array = []
      data.map((item,index) => {
        
          let obj = 
          {
            title: item.title,
            id: item._id
          }
          array.push(obj)
        });

      this.setState({
        gamesTitle: array
      })



    } catch(err) {
      console.log("Error found", err.name, err.message)

    }

}



  
  componentDidMount(){
    this.getMovieTitles()
  } 








  render() {
    //console.log(this.props[0].logged)
            const moo = {
      dog: 5,
      cat: "mouse"
    };

    return (
      <section className="games_page">
        <h1>Video Games Page</h1>
        <h2>List of Topics</h2>
         
            <Grid >
            <Grid.Row centered columns={4}>
   <Grid.Column >
  
  <img className="pics" src={pubg_image_long} alt="Pub G Long Add" height="500" width="300" />



  </Grid.Column>  
              <Grid.Column width={8}>


  <Comment.Group>
    <Header as='h3' dividing>
    </Header>
  <GamesTitleList gamesT={this.state.gamesTitle} />
	
{this.props.logged ? 
    <Form onSubmit={this.handleOnSubmit} >
      <Form.Input
		    label="Add New Topic Title Here..." 
        type="text" 
        placeholder='Add Topic' 
        name="texttitle" 
        value={this.state.texttitle} 
        onChange={this.handleOnChange}
      />
      <Form.TextArea 
        label="Type Comment Here..." 
        type="text" 
        placeholder='Add Comment' 
        name="textarea" 
        value={this.state.textarea} 
        onChange={this.handleOnChange}
      />
      <Button content='Add Topic' labelPosition='left' icon='edit' primary />
    </Form> 
    : <div></div>
}	

  

  </Comment.Group>
  </Grid.Column>
  <Grid.Column >
  <img className="pics" src={pubg_image_square} alt="Pub G Square Ad" height="300" width="300" />

  </Grid.Column>  
  </Grid.Row>
  </Grid>
        
      <img className="pics" src={pubg_long_banner} alt="Pub G Long Add" height="200" width="1000" />
      </section>
    );
  }
}