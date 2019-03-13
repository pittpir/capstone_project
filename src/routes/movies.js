import React, { Component } from 'react';
import { Button, Comment, Form, Header, Container, Grid } from 'semantic-ui-react'
import '../css/movies.css'
import MoviesList from './moviesList'


export default class Movies extends Component {
	constructor(props) {
		super(props)

		this.state ={
			textarea: '',
			title: '',
			author:'Default',
			opavatar:'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
			optext:'Default',
			opdate: '',
			movies: [
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
      //returnData = await fetch(`http://localhost:4000/movies/update/${this.props.match.params.topicId}`,options);
      returnData = await fetch(`/movies/update/${this.props.match.params.topicId}`,options);
      //console.log(returnData)

      this.setState({
//       texttitle: '',
        textarea:''

      })

	  this.getMovieComments();



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
		
		let newarray = this.state.movies;
    	newarray.splice(index,1,obj)

		this.setState({
    		movies: newarray,
    		textarea: ''

    	})


 	}

getMovieComments = async () => {
    try {

      const options = {
          method: 'get',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },          
          
      } 

      let returnData = "";
      //returnData = await fetch(`http://localhost:4000/movies/getcomments/${this.props.match.params.topicId}`);
      returnData = await fetch(`/movies/getcomments/${this.props.match.params.topicId}`);
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
        movies: array,
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
      //returnData = await fetch(`http://localhost:4000/movies/getcomments/${this.props.match.params.topicId}`);
      returnData = await fetch(`/movies/getcomments/${this.props.match.params.topicId}`);
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
    this.getMovieComments()
  } 





  render() {
   

    return (
      <section className="movies_page">
        <h1>Movies Page</h1>
         <h2 className="h2_movies">{this.state.title}</h2>
         

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

	<MoviesList movies={this.state.movies} reply={this.handleReply}/>


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








/*


    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Elliot Fu</Comment.Author>
        <Comment.Metadata>
          <div>Yesterday at 12:30AM</div>
        </Comment.Metadata>
        <Comment.Text>
          <p>This has been very useful for my research. Thanks as well!</p>
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
      <Comment.Group>
        <Comment>
          <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
          <Comment.Content>
            <Comment.Author as='a'>Jenny Hess</Comment.Author>
            <Comment.Metadata>
              <div>Just now</div>
            </Comment.Metadata>
            <Comment.Text>Elliot you are always so right :)</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Comment>

    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Joe Henderson</Comment.Author>
        <Comment.Metadata>
         <div>5 days ago</div>
        </Comment.Metadata>
        <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>



<div id="respond">

  <h3>Leave a Comment</h3>

  <Form action="post_comment.php" method="post" id="commentform">

    <label for="comment_author" class="required">Your name</label>
    <input type="text" name="comment_author" id="comment_author" value="" tabindex="1" required="required">

    <label for="email" class="required">Your email;</label>
    <input type="email" name="email" id="email" value="" tabindex="2" required="required">

    <label for="comment" class="required">Your message</label>
    <textarea name="comment" id="comment" rows="10" tabindex="4"  required="required"></textarea>

   
    <Form.Input  type="hidden" name="comment_post_ID" value="1" id="comment_post_ID" />
    <Form.Input  name="submit" type="submit" value="Submit comment" />

  </Form>

</div>


*/