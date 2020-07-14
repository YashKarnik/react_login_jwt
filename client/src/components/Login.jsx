import React, { Component } from 'react'
import Axios from 'axios'
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  handleSubmit(e) {
    e.preventDefault()
    Axios.post('/auth', { ...this.state })
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        console.log(res.data.user, localStorage.getItem('token'))
        this.setState({ email: '', password: '' })
        window.location = '/secrets'
      })
      .catch((err) => console.error('invaliod creds'))
  }
  render() {
    return (
      <div className='container'>
        <h1>Login</h1>
        <hr />
        <form onSubmit={this.handleSubmit} autoComplete='off'>
          <input
            className='form-control'
            placeholder='Email'
            name='email'
            type='email'
            value={this.state.email}
            onChange={this.handleChange}
          />
          <br />
          <input
            className='form-control'
            placeholder='Password'
            name='password'
            type='password'
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br />
          <input className='btn btn-primary btn-lg btn-block' type='Submit' />
          <br />
        </form>
      </div>
    )
  }
}
