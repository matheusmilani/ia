import React, { Component } from 'react'

import Input from '../../components/input/input'
import Select from '../../components/select/select'
import Button from '../../components/button/button'
import actions from '../../actions/actions'

import './register.css'

class Home extends Component {

  actionRegister = (email, name, social_name, role, password) => actions.register(email, name, social_name, role, password)

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
    this.actionRegister(this.state.email, this.state.name, this.state.social_name, this.state.role, this.state.password)
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
      </div>
    )
  }
}

export default Home
