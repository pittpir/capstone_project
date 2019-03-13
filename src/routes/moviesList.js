import React, { Component } from 'react';
import { Button, Comment, Form, Header, Container, Grid } from 'semantic-ui-react'
import '../css/movies.css'

export default class MoviesList extends Component {



  render() {
        const moviesList = this.props.movies.map((item, index) => {
            return (
     
            	<Comment className="comments_grid_column" key={index}>
      			<Comment.Avatar src={item.avatar} />
      			<Comment.Content>
        			<Comment.Author as='a'>Author: {item.author}</Comment.Author>
        			<Comment.Metadata>
          				<div>{item.date}</div>
        			</Comment.Metadata>
        		<Comment.Text className='textarea'>{item.text}</Comment.Text>
        		<Comment.Actions>
          		<Comment.Action onClick={this.props.reply.bind(null,index,item)}>Reply</Comment.Action>
        		</Comment.Actions>
      			</Comment.Content>
   

    {item.isComment ? 

	    <Form reply>
	      <Form.TextArea 
			label="Type Comment Here..." 
	        type="text" 
	        placeholder='Add Comment' 
	        name="textarea" 
	        
	      />
	      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
	    </Form>
	    : <div></div>
		}
		 </Comment>

            )
        })

    return (
 <div> {moviesList} </div>

)

}

}




/*



<Comment key={index}>
      <Comment.Avatar src={item.avatar} />
      <Comment.Content>
        <Comment.Author as='a'>{item.author}</Comment.Author>
        <Comment.Metadata>
          <div>{item.date}</div>
        </Comment.Metadata>
        <Comment.Text>{item.text}</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>


    */