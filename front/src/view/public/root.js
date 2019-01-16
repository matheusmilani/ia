import React, { Component } from 'react'

import Particles from 'react-particles-js';
import Login from '../../containers/login/login'
import Register from '../../containers/register/register'
import $ from 'jquery';

class Root extends Component {
  loginDisplay(){
    $("#register").hide();
    $("#login-trigger").hide();
    $("#register-trigger").show();
    $("#login").show();
  }

  registerDisplay(){
    $("#login").hide();
    $("#register-trigger").hide();
    $("#login-trigger").show();
    $("#register").show();
  }

  render () {
    return (
      <div>
        <Particles />
        <Login status="active"/>
        <p onClick={this.registerDisplay} id="register-trigger" className="active">Não é cadastrado ainda? Clique aqui!</p>
        <Register status="non-active" />
        <p onClick={this.loginDisplay} id="login-trigger" className="non-active">Já possui cadastro? Clique aqui!</p>
      </div>
    )
  }
}

export default Root
