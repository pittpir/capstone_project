import React, { Component } from 'react';
import { Button, Comment, Form, Header, Container, Grid } from 'semantic-ui-react'
import '../css/movies.css'
import MoviesTitleList from './moviesTitlesList'
import Routes from "./Routes";


export default class MoviesTitles extends Component {
	constructor(props) {
		super(props)

		this.state ={
			texttitle: '',
      textarea: '',
			moviesTitle: [
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
    	let newarray = this.state.moviesTitle;
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
      returnData = await fetch('http://localhost:4000/movies/set',options);
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
		
		let newarray = this.state.movies;
    	newarray.splice(index,1,obj)

		this.setState({
    		moviesTitle: newarray,
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
      returnData = await fetch('http://localhost:4000/movies/get');
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
        moviesTitle: array
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
      <section className="movies_page">
        <h1>Movies Page</h1>
        <h2>List of Topics</h2>
         <Container>
            <Grid>
            <Grid.Row centered>
              <Grid.Column width={10}>


  <Comment.Group>
    <Header as='h3' dividing>
    </Header>
  <MoviesTitleList moviesT={this.state.moviesTitle} />
	
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
  </Grid.Row>
  </Grid>
         </Container>   

      </section>
    );
  }
}



