import React, { Component } from 'react';
import './App.css';
import Messages from './components/Messages'
import AddMessage from './components/AddMessage'

import { graphql } from 'react-apollo'
import ListMessages from './queries/ListMessages'
import NewMessagesSubscriptionQuery from './queries/NewMessagesSubscription';

class App extends Component {
  componentWillMount(){
    this.props.subscribeToMessages();
  }
  render() {
    return (
      <div className="App">
        <AddMessage />
        <Messages />
      </div>
    );
  }
}

export default graphql(
  ListMessages, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props =>(
      {
        message: props.data.listMessages ? props.data.listMessages.items : [],
        subscribeToMessages: params => {
          props.data.subscribeToMore({
              document: NewMessagesSubscriptionQuery,
              updateQuery: (prev, { subscriptionData: { data : { onCreateMessages } } }) => {
                return {
                  ...prev,
                  listMessages: {
                    __typename: 'MessagesConnection',
                    items: [onCreateMessages, ...prev.listMessages.items.filter(Messages => Messages.id !== onCreateMessages.id)]
                  }
                }
              }
          });
      },
      }
    )
  }
)(App)
