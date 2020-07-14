import React, { Component } from 'react'
import Axios from 'axios'
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
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
    Axios.post('http://localhost:5000/users/add', { ...this.state })
      .then((res) => {
        this.setState({ username: '', email: '', password: '' })
        window.location = '/login'
      })
      .catch((err) => console.error(err))
  }
  render() {
    return (
      <div className='container'>
        <h1>Register</h1>
        <hr />
        <form onSubmit={this.handleSubmit} autoComplete='off'>
          <input
            className='form-control'
            placeholder='Username'
            name='username'
            type='text'
            value={this.state.username}
            onChange={this.handleChange}
          />
          <br />
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
