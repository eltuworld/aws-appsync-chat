import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import Message from './Message'
import ListMessagesQuery from '../queries/ListMessages'

class Messages extends Component {

  render() {
      if (this.props.listMessages && this.props.listMessages.loading) {
        return <div>Loading</div>
      }
      if (this.props.listMessages && this.props.listMessages.error) {
        return <div>Error</div>
      }
      const messageData = this.props.listMessages.listMessages.items
      let SortByDate = messageData.slice(0);
      SortByDate.sort(function(a,b) {
        return b.createdAt - a.createdAt;
      });
    return (
      <div>
        <ul className="list-group">
          {
            SortByDate.map(item => 
            <Message key={item.id} item={item} />
            )}
        </ul>
      </div>
    )
  }
}


export default graphql(ListMessagesQuery, { name: 'listMessages' }) (Messages)
