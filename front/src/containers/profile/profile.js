import React, { Component } from 'react'
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import Input from '../../components/input/input'
import TextArea from '../../components/textarea/textarea'
import Select from '../../components/select/select'
import Button from '../../components/button/button'
import CreatableSelect from 'react-select/lib/Creatable';

import './profile.css'
import 'react-toastify/dist/ReactToastify.css';

class ProfileForm extends Component {
  toastId = null;
  notify = () => this.toastId = toast("Salvando dados...");
  success = () => toast.update(this.toastId,
                                {
                                  render: "Dados atualizados com sucesso.",
                                  type: toast.TYPE.SUCCESS
                                }
                              );
  error = () => toast.update(this.toastId,
                                {
                                  render: "Erro ao atualizar dados.",
                                  type: toast.TYPE.ERROR
                                }
                              );

  state = {
    id: '',
    email: '',
    name: '',
    social_name: '',
    role: '',
    minibio: '',
    password: '',
    interests: ''
  };

  initial_interests = []

  componentDidMount() {
    axios.get(process.env.REACT_APP_API_URL + '/api/user?id=' + JSON.parse(sessionStorage.getItem("userLoggedIn")).id,{ headers: { 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDc3OTg5MTksImlhdCI6MTU0Nzc3MDExOSwibmJmIjoxNTQ3NzcwMTE5LCJzdWIiOiJzdHVkZW50QHN0dWRlbnQuY29tIiwiaWRfdXNlciI6OSwibmFtZSI6IkVzdHVkYW50ZSIsInJvbGVzIjpbInN0dWRlbnQiXX0.IRjxxNeBk1Tu43vz1yoduDU-WJ4Mo0Ji6q5QfcpOFPE' }})
      .then(
        (response) => {
          this.initial_interests = response.data.interests
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

  handleEmailChange = event => this.setState({email: event.target.value})
  handleNameChange = event => this.setState({name: event.target.value})
  handleSocialNameChange = event => this.setState({social_name: event.target.value})
  handlePasswordChange = event => this.setState({password: event.target.value})
  handleMinibioChange = event => this.setState({minibio: event.target.value})
  handleInterestsChange = (newValue: any) => { this.setState({interests: newValue}) };

  actionUpdate = event => {
    event.preventDefault()
    this.notify()
    axios.post(process.env.REACT_APP_API_URL + '/api/user', (
      {
        id: this.state.id,
        email: this.state.email,
        name: this.state.name,
        social_name: this.state.social_name,
        role: this.state.role,
        minibio: this.state.minibio,
        interests: this.state.interests
      }
    )).then(
        (response) => { this.success() },
        (error) => { this.error() }
      )
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col profile-form">
            <div className="row">
            <div className="col">
            <h2 className="title">Meu perfil</h2>
            </div>
            </div>
            <form onSubmit={this.actionUpdate}>
              <div className="profile-form">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <Input label="Nome" placeholder="Nome" type="text" onChange={this.handleNameChange} required={true} value={this.state.name}/>
                  </div>
                  <div className="col-12 col-md-6">
                    <Input label="Nome Social" placeholder="Nome social" type="text" onChange={this.handleSocialNameChange} required={true} value={this.state.social_name}/>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-md-6">
                    <Input label="E-mail" placeholder="E-mail" type="email" onChange={this.handleEmailChange} required={true} value={this.state.email}/>
                  </div>
                  <div className="col-12 col-md-6">
                    <Select label="Perfil" required={true} value={this.state.role}/>
                  </div>
                </div>

                <div className="row">
                <div className="col">
                <TextArea label="Minibio" placeholder="Minibio" onChange={this.handleMinibioChange} value={this.state.minibio}/>
                </div>
                </div>

                <div className="row">
                <div className="col">
                <label>Interesses</label>
                <CreatableSelect
                  className="hide-select"
                  isMulti
                  onChange={this.handleInterestsChange}
                  value={this.state.interests}
                  placeholder="Interesses"
                  components={{ DropdownIndicator: null }}
                  formatCreateLabel={(word) => 'Adicionar ' + word}
                />
                </div>
                </div>

                <div className="row">
                  <div className="col">
                  <Button class="btn-profile" type="submit" text="Salvar"/>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    )
  }
}

export default ProfileForm
