import React, { Component } from 'react'
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import Input from '../../components/input/input'
import Button from '../../components/button/button'

import './login.css'
import 'react-toastify/dist/ReactToastify.css';

class Home extends Component {
  toastId = null;
  notify = () => this.toastId = toast("Fazendo login...");
  error = () => toast.update(this.toastId,
                                {
                                  render: "Dados incorretos. Por favor, revise-os.",
                                  type: toast.TYPE.ERROR
                                }
                              );
  state = {
    user: '',
    password: ''
  };

  handleUsernameChange = event => this.setState({user: event.target.value})
  handlePasswordChange = event => this.setState({password: event.target.value})
  handleLogin = event => {
    event.preventDefault();
    this.notify()
    axios.post(process.env.REACT_APP_API_URL + '/api/authentication', ({username: this.state.user, password: this.state.password} ))
      .then(
        (response) => {
          sessionStorage.setItem("userLoggedIn", JSON.stringify(response.data));
          window.location.replace("/" + response.data.roles[0])
        },
        (error) => { this.error() }
      )
  }

  render() {
    return (
      <div className={this.props.status + " login"} id="login">
        <form onSubmit={this.handleLogin}>
          <div className="login-form">
            <Input placeholder="E-mail" id="user" type="email" onChange={this.handleUsernameChange} required={true} />
            <Input placeholder="Senha" id="password" type="password" onChange={this.handlePasswordChange} required={true} />
            <Button class="btn-login" type="submit" text="Login"/>
          </div>
        </form>
        <ToastContainer />
      </div>
    )
  }
}

export default Home
