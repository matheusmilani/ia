import React, { Component } from 'react'

import Particles from 'react-particles-js';
import Login from '../../containers/login/login'
import Register from '../../containers/register/register'
import $ from 'jquery';

class Root extends Component {
  changeDisplay = (toHide, toDisplay) => (e) => {
    $("#"+toHide+"-active").fadeOut();
    $("#"+toHide).fadeOut("slow", function(){
      $("#"+toDisplay+"-active").fadeIn();
      $("#"+toDisplay).fadeIn();
    });
  }

  render () {
    return (
      <div>
        <Particles />
        <Login status="active"/>
        <p onClick={this.changeDisplay('login', 'register')} id="login-active" className="active">Não é cadastrado ainda? Clique aqui!</p>
        <Register status="non-active" />
        <p onClick={this.changeDisplay('register', 'login')} id="register-active" className="non-active">Já possui cadastro? Clique aqui!</p>
      </div>
    )
  }
}

export default Root
