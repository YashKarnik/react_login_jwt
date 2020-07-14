import React, { Component } from 'react'
import Axios from 'axios'

export default class Secrets extends Component {
  constructor(props) {
    super(props)
    this.state = {
      obtainedData: '',
    }
  }
  componentDidMount() {
    Axios.get('/users/find', {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    })
      .then((res) => {
        console.log(res.data)
        this.setState({ obtainedData: res.data.username })
      })
      .catch((err) => console.error(err))
    console.log()
  }
  render() {
    return (
      <div className='container Jumbotron Secrets'>
        <h1>Your username is:</h1>
        <hr />
        <h2>{this.state.obtainedData}</h2>

        <button
          className='btn btn-primary btn-lg btn-block'
          onClick={() => {
            localStorage.clear('token')
            window.location = '/'
          }}>
          Logout
        </button>
      </div>
    )
  }
}
