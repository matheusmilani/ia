import React, { Component } from 'react'

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import Input from '../../components/input/input'
import Button from '../../components/button/button'

import './login.css'
import 'react-toastify/dist/ReactToastify.css';

class Home extends Component {

  state = {
    user: '',
    password: ''
  };

  toastAlert = null
  callApi = () => this.toastAlert = toast("Carregando...", {
                              position: "bottom-right",
                              autoClose: 5000
                              })
  error = () => toast.update(this.toastAlert, { render: 'Usuário ou senha incorretos!', type: toast.TYPE.ERROR });
  success = () => toast.update(this.toastAlert, { render: 'Bem vindo!', type: toast.TYPE.SUCCESS });

  handleUsernameChange = event => this.setState({user: event.target.value})
  handlePasswordChange = event => this.setState({password: event.target.value})

  handleSubmit = event => {
    event.preventDefault();
    this.callApi()
    axios.post('http://127.0.0.1:5000/api/authentication', ({username: this.state.user, password: this.state.password} ))
      .then(
        (response) => {
          sessionStorage.setItem("userLoggedIn", response);
          this.success()
          window.location.replace("/student")
        },
        (error) => { this.error() }
      )
  }

  render() {
    return (
      <div className={this.props.status + " login"} id="login">
        <form onSubmit={this.handleSubmit}>
          <div className="login-form">
            <Input placeholder="E-mail" id="user" type="text" onChange={this.handleUsernameChange}/>
            <Input placeholder="Senha" id="password" type="password" onChange={this.handlePasswordChange}/>
            <Button type="submit" text="Login"/>
          </div>
        </form>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange={false}
          draggable
          pauseOnHover
          />
      </div>
    )
  }
}

export default Home
