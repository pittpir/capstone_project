import React, { Component } from 'react';
import { List, Icon } from 'semantic-ui-react'
import { Route, Link } from "react-router-dom";
import '../css/games.css'

import Games from './games'

export default class GamesTitleList extends Component {



  render() {


        const gamesTitleList = this.props.gamesT.map((item, index) => {
            return (
     

  
    <List.Item className="links" key={index}>
      <List.Content className="links">
        <List.Header className="links" as={Link} to={`/games/${item.id}`}>{item.title}</List.Header>
      </List.Content>
    </List.Item>


            )
        })





    return (
            <div>
            <List divided relaxed className="cow">
                {gamesTitleList}
            </List>
            
              
</div>

)

}

}
