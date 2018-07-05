import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import uuidV4 from 'uuid'
import CreateMessageQuery from '../queries/CreateMessage'

class AddMessage extends Component {
  handleSubmit(e) {
    e.preventDefault()
    let formData = new FormData(this.form)
    this.props
      .mutate({ variables: { 
          id: uuidV4(),
          username: formData.get('name'),
          message: formData.get('message'),
          createdAt: Math.round((new Date()).getTime() / 1000)
        } })
      .then(res => {
        if (res.data.createMessage.formErrors === null) {
          console.log(res.data.createMessage.formErrors)
        } else {
          console.log(res.data.createMessage.formErrors)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <form
          ref={ref => (this.form = ref)}
          onSubmit={e => this.handleSubmit(e)}
        >
          <div className="row">
            <div className="col">
              <input name="name" placeholder="Name" className="form-control"/>
            </div>
            <div className="col">
              <input id="message" name="message" placeholder="Say something" className="form-control"/>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">Send Message</button>
        </form>
      </div>
    )
  }
}
AddMessage = graphql(CreateMessageQuery)(AddMessage)
export default AddMessage
