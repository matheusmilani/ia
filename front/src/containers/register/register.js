import React, { Component } from 'react'

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import Input from '../../components/input/input'
import Button from '../../components/button/button'

import './register.css'
import 'react-toastify/dist/ReactToastify.css';

class Home extends Component {

  state = {
    email: '',
    name: '',
    social_name: '',
    role: '',
    password: '',
  };

  toastAlert = null
  callApi = () => this.toastAlert = toast("Registrando...", {
                              position: "bottom-right",
                              autoClose: 5000
                              })
  error = () => toast.update(this.toastAlert, { render: 'Dados incorretos!', type: toast.TYPE.ERROR });
  success = () => toast.update(this.toastAlert, { render: 'Registro realizado com sucesso!', type: toast.TYPE.SUCCESS });

  handleEmailChange = event => this.setState({email: event.target.value})
  handleNameChange = event => this.setState({name: event.target.value})
  handleSocialNameChange = event => this.setState({social_name: event.target.value})
  handleRoleChange = event => this.setState({role: event.target.value})
  handlePasswordChange = event => this.setState({password: event.target.value})

  handleSubmit = event => {
    event.preventDefault();
    this.callApi()
    axios.post('http://127.0.0.1:5000/api/user', (
      {email: this.state.email,
      name: this.state.name,
      social_name: this.state.social_name,
      role: this.state.role,
      password: this.state.password}
    )).then(
        (response) => {
          this.success()
          window.location.replace("/")
        },
        (error) => { this.error() }
      )
  }

  render() {
    return (
      <div className={this.props.status + " register"} id="register" >
        <form onSubmit={this.handleSubmit}>
          <div className="register-form">
          <Input placeholder="E-mail" id="user" type="text" onChange={this.handleEmailChange}/>
          <Input placeholder="Nome" id="user" type="text" onChange={this.handleNameChange}/>
          <Input placeholder="Nome social" id="user" type="text" onChange={this.handleSocialNameChange}/>
          <Input placeholder="Perfil" id="user" type="text" onChange={this.handleRoleChange}/>
          <Input placeholder="Senha" id="password" type="password" onChange={this.handlePasswordChange}/>
          <Button type="submit" text="Cadastrar"/>
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
