import React, { Component } from 'react'

class Message extends Component {
  render() {
    return (
        <li className="list-group-item">
          {this.props.item.username} says "{this.props.item.message}"
        </li>
    )
  }
}

export default Message