import React, { Component } from 'react'
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import ModuleCard from '../../../components/module-card/module-card'
import Input from '../../../components/input/input'
import TextArea from '../../../components/textarea/textarea'
import Button from '../../../components/button/button'

import Modal from 'react-responsive-modal';

import 'react-toastify/dist/ReactToastify.css';

class ModuleTab extends Component {
  toastId = null;
  notify = () => this.toastId = toast("Criando registro...");
  success = (msg) => toast.update(this.toastId,
                                {
                                  render: msg,
                                  type: toast.TYPE.SUCCESS
                                }
                              );
  error = (msg) => toast.update(this.toastId,
                                {
                                  render: msg,
                                  type: toast.TYPE.ERROR
                                }
                              );

  state = {
    modules: [],
    openModal: false
  }

  onOpenModal = () => {
    this.setState({ openModal: true });
  };

  onCloseModal = () => {
    this.setState({ openModal: false });
  };

  getModules = () => {
    axios.get(process.env.REACT_APP_API_URL + '/api/module?course=' + this.props.course_id,{ headers: { 'Authorization':  JSON.parse(sessionStorage.getItem("userLoggedIn")).access_token }})
      .then(
        (response) => {
          this.setState({modules: response.data})
        }
      )
  }

  handleNameChange = event => this.setState({name: event.target.value})
  handleDescriptionChange = event => this.setState({description: event.target.value})
  handleSubmit = event => {
    event.preventDefault();
    this.notify()
    axios.post(process.env.REACT_APP_API_URL + '/api/module',
      {
      name: this.state.name,
      description: this.state.description,
      course_id: this.props.course_id,
      required: true,
      position: 1
    },
    { headers: { 'Authorization':  JSON.parse(sessionStorage.getItem("userLoggedIn")).access_token }}
    ).then(
        (response) => { this.success("Dados salvos com sucesso."); this.getModules(); this.setState({ openModal: false }) },
        (error) => { this.error("Erro ao salvar dados.") }
      )
  }

  deleteModule = (moduleId) => {
    this.notify()
    axios.delete(process.env.REACT_APP_API_URL + '/api/module',
    {data: {
      id: moduleId,
      headers: { 'Authorization':  JSON.parse(sessionStorage.getItem("userLoggedIn")).access_token }
    }}
    ).then(
        (response) => { this.success("Módulo deletado com sucesso."); this.getModules(); },
        (error) => { this.error("Erro ao deletar módulo.") }
      )
  }

  selectModuleClick =(moduleId) => {
    this.props.selectModule(moduleId);
  }

  componentDidMount(){
    this.getModules()
  }

  render() {
      return (
        <>
        <div className="container-fluid" id={this.props.identify}>
          <div className="row">
            <div className="col">
              {this.state.modules.map(module =>
                <ModuleCard status="current" key={module.id} id={module.id} title={module.name} deletable="true" deleteOnClick={this.deleteModule.bind(this, module.id)} editOnClick={() => this.selectModuleClick(module.id)}/>
              )}
              <div className="module-card module-new" onClick={this.onOpenModal}>
                <span className="title-card">Adicionar novo módulo</span>
              </div>

            </div>
          </div>
        </div>

        <Modal open={this.state.openModal} onClose={this.onCloseModal} center className="modal-form">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2>Novo módulo</h2>
            </div>
          </div>
          <div className="row">
            <div className="col">
            <form onSubmit={this.handleSubmit}>
              <div className="profile-form">
                <div className="row">
                  <div className="col">
                    <Input label="Nome" placeholder="Nome" type="text" onChange={this.handleNameChange} required={true} value={this.state.name}/>
                  </div>

                </div>

                <div className="row">
                  <div className="col">
                    <TextArea label="Descrição" placeholder="Descrição" onChange={this.handleDescriptionChange} value={this.state.description} required={true} />
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
        </Modal>
        <ToastContainer />
        </>
      )
  }
}

export default ModuleTab
