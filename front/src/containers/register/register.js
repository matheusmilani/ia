import React, { Component } from 'react'
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import Input from '../../components/input/input'
import Select from '../../components/select/select'
import Button from '../../components/button/button'

import './register.css'
import 'react-toastify/dist/ReactToastify.css';

class Home extends Component {
  toastId = null;
  notify = () => this.toastId = toast("Criando registro...");
  success = () => toast.update(this.toastId,
                                {
                                  render: "Usuário salvo com sucesso. Por favor, faça login no sistema.",
                                  type: toast.TYPE.SUCCESS
                                }
                              );
  error = () => toast.update(this.toastId,
                                {
                                  render: "Dados incorretos, por favor, revise-os.",
                                  type: toast.TYPE.ERROR
                                }
                              );

  state = {
    email: '',
    name: '',
    social_name: '',
    role: '',
    password: '',
  };

  handleEmailChange = event => this.setState({email: event.target.value})
  handleNameChange = event => this.setState({name: event.target.value})
  handleSocialNameChange = event => this.setState({social_name: event.target.value})
  handleRoleChange = event => this.setState({role: event.target.value})
  handlePasswordChange = event => this.setState({password: event.target.value})

  handleSubmit = event => {
    event.preventDefault();
    this.notify()
    axios.post(process.env.REACT_APP_API_URL + '/api/user', (
      {email: this.state.email,
      name: this.state.name,
      social_name: this.state.social_name,
      role: this.state.role,
      password: this.state.password}
    )).then(
        (response) => { this.success() },
        (error) => { this.error() }
      )
  }

  render() {
    return (
      <div className={this.props.status + " register"} id="register" >
        <form onSubmit={this.handleSubmit}>
          <div className="register-form">
          <Input placeholder="E-mail" id="user" type="email" onChange={this.handleEmailChange} required={true}/>
          <Input placeholder="Nome" id="user" type="text" onChange={this.handleNameChange} required={true}/>
          <Input placeholder="Nome social" id="user" type="text" onChange={this.handleSocialNameChange} required={true}/>
          <Select label="Perfil" onChange={this.handleRoleChange} required={true}/>
          <Input placeholder="Senha" id="password" type="password" onChange={this.handlePasswordChange} required={true}/>
          <Button type="submit" text="Cadastrar"/>
          </div>
        </form>
        <ToastContainer />
      </div>
    )
  }
}

export default Home
