import React, { Component } from 'react'
import axios from 'axios';

import Input from '../../components/input/input'
import TextArea from '../../components/textarea/textarea'
import Button from '../../components/button/button'
import CreatableSelect from 'react-select/lib/Creatable';

import './form.css'
import 'react-toastify/dist/ReactToastify.css';

class NewCourseForm extends Component {

  handleNameChange = event => this.setState({name: event.target.value})
  handleDescriptionChange = event => this.setState({description: event.target.value})
  handleImageChange = event => this.setState({image: event.target.value})
  handleThemeChange = (newValue: any) => this.setState({theme: newValue})
  handleHotKeysChange = (newValue: any) => { this.setState({hot_keys: newValue}) };
  handleCreateHotKey = (inputValue: any) => {
    var hot_keys = this.state.hot_keys || []

    axios.post(process.env.REACT_APP_API_URL + '/api/hot_key',
      { name: inputValue },
      { headers: { 'Authorization': JSON.parse(sessionStorage.getItem("userLoggedIn")).access_token }})
      .then(
        (response) => {
          axios.get(process.env.REACT_APP_API_URL + '/api/hot_key?name=' + inputValue,
            { headers: { 'Authorization':  JSON.parse(sessionStorage.getItem("userLoggedIn")).access_token }})
            .then(
              (response) => {
                this.list_all_hot_keys()
                hot_keys.push(response.data)
                this.setState({hot_keys: hot_keys})
              }
            )
        }
      )
    }

    handleCreateTheme = (inputValue: any) => {
      axios.post(process.env.REACT_APP_API_URL + '/api/theme',
        { name: inputValue },
        { headers: { 'Authorization': JSON.parse(sessionStorage.getItem("userLoggedIn")).access_token }})
        .then(
          (response) => {
            axios.get(process.env.REACT_APP_API_URL + '/api/theme?name=' + inputValue,
              { headers: { 'Authorization':  JSON.parse(sessionStorage.getItem("userLoggedIn")).access_token }})
              .then(
                (response) => {
                  this.list_all_themes()
                  this.setState({theme: response.data})
                }
              )

          }
        )
      }


  state = {
    all_themes: []
  }

  list_all_themes = () => {
    axios.get(process.env.REACT_APP_API_URL + '/api/theme',{ headers: { 'Authorization':  JSON.parse(sessionStorage.getItem("userLoggedIn")).access_token }})
      .then(
        (response) => {
          this.setState({all_themes: response.data})
        }
      )
  }

  list_all_hot_keys = () => {
    axios.get(process.env.REACT_APP_API_URL + '/api/hot_key',{ headers: { 'Authorization':  JSON.parse(sessionStorage.getItem("userLoggedIn")).access_token }})
      .then(
        (response) => {
          this.setState({all_hot_keys: response.data})
        }
      )
  }

  componentDidMount(){
    this.list_all_themes()
    this.list_all_hot_keys()
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col profile-form">
            <div className="row">
              <div className="col">
                <h2 className="title">Novo curso</h2>
              </div>
            </div>
            <form onSubmit={this.actionCreate}>
              <div className="profile-form">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <Input label="Nome" placeholder="Nome" type="text" onChange={this.handleNameChange} required={true} value={this.state.name}/>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Tema</label>
                    <CreatableSelect
                      className="hide-select"
                      onChange={this.handleThemeChange}
                      value={this.state.theme}
                      options={this.state.all_themes}
                      placeholder="Temas"
                      formatCreateLabel={(word) => 'Adicionar ' + word}
                      onCreateOption={this.handleCreateTheme}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <TextArea label="Descrição" placeholder="Descrição" onChange={this.handleDescriptionChange} value={this.state.description}/>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-md-6">
                    <Input label="Imagem" placeholder="Imagem" type="text" onChange={this.handleImageChange} required={false} value={this.state.image}/>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Hot Keys <small>Palavra chave</small></label>
                    <CreatableSelect
                      className="hide-select"
                      isMulti
                      onChange={this.handleHotKeysChange}
                      value={this.state.hot_keys}
                      options={this.state.all_hot_keys}
                      placeholder="Palavras chave"
                      components={{ DropdownIndicator: null }}
                      formatCreateLabel={(word) => 'Adicionar ' + word}
                      onCreateOption={this.handleCreateHotKey}
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
      </div>
    )
  }
}

export default NewCourseForm
