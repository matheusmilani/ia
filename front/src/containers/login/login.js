import React, { Component } from 'react'

import Input from '../../components/input/input'
import Button from '../../components/button/button'
import actions from '../../actions/actions'

import './login.css'
import 'react-toastify/dist/ReactToastify.css';

class Home extends Component {

  actionLogin = (user, pass) => actions.login(user, pass)
  
  state = {
    user: '',
    password: ''
  };

  handleUsernameChange = event => this.setState({user: event.target.value})
  handlePasswordChange = event => this.setState({password: event.target.value})
  handleLogin = event => {
    event.preventDefault();
    this.actionLogin(this.state.user, this.state.password)
  }

  render() {
    return (
      <div className={this.props.status + " login"} id="login">
        <form onSubmit={this.handleLogin}>
          <div className="login-form">
            <Input placeholder="E-mail" id="user" type="email" onChange={this.handleUsernameChange} required={true} />
            <Input placeholder="Senha" id="password" type="password" onChange={this.handlePasswordChange} required={true} />
            <Button type="submit" text="Login"/>
          </div>
        </form>
      </div>
    )
  }
}

export default Home
