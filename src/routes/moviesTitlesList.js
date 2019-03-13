import React, { Component } from 'react';
import { List, Icon } from 'semantic-ui-react'
import { Route, Link } from "react-router-dom";
import '../css/movies.css'

import Movies from './movies'

export default class MoviesTitleList extends Component {



  render() {


        const moviesTitleList = this.props.moviesT.map((item, index) => {
            return (
     

  
    <List.Item className="links" key={index}>
      <List.Content className="links">
        <List.Header className="links" as={Link} to={`/movies/${item.id}`}>{item.title}</List.Header>
      </List.Content>
    </List.Item>


            )
        })





    return (
            <div>
            <List divided relaxed className="cow">
                {moviesTitleList}
            </List>
            
              
</div>

)

}

}


/*

                <li className="links_list" key={index}>    
                    <Link className="links" as={Link} to={`/movies/${item.id}`} >{item.title}</Link>
                </li>


*/