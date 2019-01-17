import React, { Component } from 'react'
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import Input from '../../components/input/input'
import Select from '../../components/select/select'
import Button from '../../components/button/button'

import './profile.css'
import 'react-toastify/dist/ReactToastify.css';
require('dotenv').config()

class ProfileForm extends Component {
  state = {
    id: '',
    email: '',
    name: '',
    social_name: '',
    role: '',
    minibio: '',
    password: '',
  };

  componentDidMount() {
    axios.get(process.env.REACT_APP_API_URL + '/api/user?id=1')
      .then(
        (response) => {
          this.setState({
            id: response.data.id,
            email: response.data.email,
            name: response.data.name,
            social_name: response.data.social_name,
            role: response.data.roles[0],
            password: response.data.password,
            minibio: response.data.minibio,
            interests: response.data.interests
          })
        }
      )
  }

  notify = () => toast("Salvando perfil...");

  handleEmailChange = event => this.setState({email: event.target.value})
  handleNameChange = event => this.setState({name: event.target.value})
  handleSocialNameChange = event => this.setState({social_name: event.target.value})
  handleRoleChange = event => this.setState({role: event.target.value})
  handlePasswordChange = event => this.setState({password: event.target.value})
  handleMinibioChange = event => this.setState({minibio: event.target.value})
  handleInterestsChange = event => this.setState({interests: event.target.value})

  actionUpdate = event => {
    event.preventDefault()
    this.notify()
    axios.post(process.env.REACT_APP_API_URL + '/api/user', (
      {
        id: this.state.id,
        email: this.state.email,
        name: this.state.name,
        social_name: this.state.social_name,
        role: this.state.role
      }
    )).then(
        (response) => {
          alert("Ok")
        },
        (error) => { alert("not Ok") }
      )
  }

  render() {
    return (
      <div className={this.props.status + " profile"} id="profile">
        <form onSubmit={this.actionUpdate}>
          <div className="profile-form">
            <Input placeholder="E-mail" id="user" type="email" onChange={this.handleEmailChange} required={true} value={this.state.email}/>
            <Input placeholder="Nome" id="user" type="text" onChange={this.handleNameChange} required={true} value={this.state.name}/>
            <Input placeholder="Nome social" id="user" type="text" onChange={this.handleSocialNameChange} required={true} value={this.state.social_name}/>
            <Select label="Perfil" onChange={this.handleRoleChange} required={true} value={this.state.role}/>
            <Button type="submit" text="Salvar"/>
          </div>
        </form>
        <ToastContainer />
      </div>
    )
  }
}

export default ProfileForm
