import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.css'
import services from '../../services/'
import LoginForm from './form'

class Login extends Component {
  state = {
    loading: false,
    success: null,
    error: null
  }
  onLogin = ({ username, password }) => {
    if (!username.length || !password.length) {
      return this.setState({
        error: 'Username and Pasword need to be filled out.',
        success: false
      })
    }
    this.setState({ loading: true })

    services
      .getToken({ username, password })
      .then(token => {
        this.setState({ loading: false, success: true })

        Promise.all([services.getScripts()])
          .then(() => {
            this.props.history.push('/')
          })
          .catch(err => {
            console.error('Error while fetching all the data: ', err)
            this.setState({ error: err })
          })
      })
      .catch(err => {
        this.setState({ loading: false, error: err, success: false })
      })
  }
  closeError = () => {
    this.setState({
      loading: false,
      success: null,
      error: null
    })
  }
  render() {
    console.log(this.props)
    return (
      <LoginForm
        {...this.state}
        onLogin={this.onLogin}
        closeError={this.closeError}
      />
    )
  }
}
export default withRouter(Login)
