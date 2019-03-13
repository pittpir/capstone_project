import React, { Component } from 'react';
import { Button, Comment, Form, Header, Container, Grid } from 'semantic-ui-react'
import '../css/games.css'
import GamesList from './gamesList'


export default class Games extends Component {
	constructor(props) {
		super(props)

		this.state ={
			textarea: '',
			title: '',
			author:'Default',
			opavatar:'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
			optext:'Default',
			opdate: '',
			games: [
			{
				author: "Chris",
				avatar: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
				date: 'Nov 11 2018',
				text: 'Yo!!!!',
				isComment: false
			},
				{
				author: "Chris",
				avatar: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
				date: 'Nov 11 2018',
				text: 'Yo!!!!',
				isComment: false
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
    	//console.log(this.state.textarea)
    	let obj = {
    		author: 'Cassie',
    		avatar: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
    		date: 'Nov 11 2018',
    		text: this.state.textarea
    	}
    	
      let today = new Date().toLocaleDateString()

      let newobj = {
            "avatar": 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
            "date": today,
            "text_author": this.props.username,
            "message": this.state.textarea
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
      //returnData = await fetch(`http://localhost:4000/games/update/${this.props.match.params.topicId}`,options);
      returnData = await fetch(`/games/update/${this.props.match.params.topicId}`,options);
      //console.log(returnData)

      this.setState({
//       texttitle: '',
        textarea:''

      })

	  this.getGameComments();



 //   	let newarray = this.state.movies;
 //   	newarray.push(obj)

 //   	this.setState({
//    		movies: newarray,
//    		textarea: ''

 //   	})

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
    		games: newarray,
    		textarea: ''

    	})


 	}

getGameComments = async () => {
    try {

      const options = {
          method: 'get',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },          
          
      } 

      let returnData = "";
      //returnData = await fetch(`http://localhost:4000/games/getcomments/${this.props.match.params.topicId}`);
      returnData = await fetch(`/games/getcomments/${this.props.match.params.topicId}`);
      const data = await returnData.json();
      
      //console.log(data.text);
      let array = []
      data.text.map((item,index) => {
        
 		let obj = 
			{
				author: item.author,
				avatar: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
				date: item.date,
				text: item.message,
				isComment: false
			}
          array.push(obj)
        });

      this.setState({
        games: array,
        title: data.title
      })

    } catch(err) {
      console.log("Error found", err.name, err.message)
    }

}

getOpComments = async () => {
    try {

      const options = {
          method: 'get',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },          
          
      } 

      let returnData = "";
      //returnData = await fetch(`http://localhost:4000/games/getcomments/${this.props.match.params.topicId}`);
      returnData = await fetch(`/games/getcomments/${this.props.match.params.topicId}`);
      const data = await returnData.json();

      this.setState({
        author: data.author,
		opavatar: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
		optext: data.message,
		opdate: data.date
      })

    } catch(err) {
      console.log("Error found", err.name, err.message)
    }

}





  
  componentDidMount(){
    this.getOpComments()
    this.getGameComments()
  } 





  render() {
   

    return (
      <section className="games_page">
        <h1>Video Games Page</h1>
         <h2 className="h2_games">{this.state.title}</h2>
         

         <Container className="op_container">
            <Grid className="op_grid" >
            <Grid.Row centered>
              <Grid.Column  className="op_grid_column" width={10}> 

  <Comment.Group >
            	<Comment>
      			<Comment.Avatar src={this.state.opavatar} />
      			<Comment.Content>
        			<Comment.Author as='a'>Author: {this.state.author}</Comment.Author>
        			<Comment.Metadata>
          				<div>{this.state.opdate}</div>
        			</Comment.Metadata>
        		<Comment.Text className='textarea'>{this.state.optext}</Comment.Text>
      			</Comment.Content>
      			</Comment>
      			  </Comment.Group>
  </Grid.Column>
  </Grid.Row>
  </Grid>
  </Container>  


         <Container>
            <Grid>
            <Grid.Row centered>
              <Grid.Column  width={10}>


  <Comment.Group>
    <Header as='h3' dividing>
      User Comments
    </Header>

	<GamesList games={this.state.games} reply={this.handleReply}/>


{this.props.logged ? 
    <Form onSubmit={this.handleOnSubmit} reply>
      <Form.TextArea 
		label="Type Comment Here..." 
        type="text" 
        placeholder='Add Comment' 
        name="textarea" 
        value={this.state.textarea} 
        onChange={this.handleOnChange}
      />
      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
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

