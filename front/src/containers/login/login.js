import React, { Component } from 'react'

import Input from '../../components/input/input'
import Button from '../../components/button/button'
import Particles from 'react-particles-js';

import './login.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin() {
    console.log('clicou')
  }

  render() {
    return (
      <div>
        <Particles />
        <div className="login-form">
          <Input placeholder="E-mail"/>
          <Input placeholder="Senha"/>
          <Button text="Login"/>
        </div>
      </div>
    )
  }
}

export default Home
