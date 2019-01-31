import React, { Component } from 'react'
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import ModuleCard from '../../../components/module-card/module-card'
import Input from '../../../components/input/input'
import TextArea from '../../../components/textarea/textarea'
import Button from '../../../components/button/button'

import Modal from 'react-responsive-modal';

import 'react-toastify/dist/ReactToastify.css';

class TopicTab extends Component {
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
    topics: [],
    openModal: false
  }

  onOpenModal = () => {
    this.setState({ openModal: true });
  };

  onCloseModal = () => {
    this.setState({ openModal: false });
  };

  getTopics = () => {
    axios.get(process.env.REACT_APP_API_URL + '/api/topic?module=' + this.props.lesson_id,{ headers: { 'Authorization':  JSON.parse(sessionStorage.getItem("userLoggedIn")).access_token }})
      .then(
        (response) => {
          this.setState({topics: response.data})
        }
      )
  }

  handleNameChange = event => this.setState({name: event.target.value})
  handleDescriptionChange = event => this.setState({description: event.target.value})
  handleSubmit = event => {
    event.preventDefault();
    this.notify()
    axios.post(process.env.REACT_APP_API_URL + '/api/topic',
      {
      name: this.state.name,
      description: this.state.description,
      lesson_id: this.props.lesson_id,
      required: true,
      position: 1
    },
    { headers: { 'Authorization':  JSON.parse(sessionStorage.getItem("userLoggedIn")).access_token }}
    ).then(
        (response) => { this.success("Dados salvos com sucesso."); this.getTopics(); this.setState({ openModal: false }) },
        (error) => { this.error("Erro ao salvar dados.") }
      )
  }

  deleteTopic = (id_topic) => {
    this.notify()
    axios.delete(process.env.REACT_APP_API_URL + '/api/topic',
    {data: {
      id: id_topic,
      headers: { 'Authorization':  JSON.parse(sessionStorage.getItem("userLoggedIn")).access_token }
    }}
    ).then(
        (response) => { this.success("Módulo deletado com sucesso."); this.getTopics(); },
        (error) => { this.error("Erro ao deletar aula.") }
      )
  }

  selectTopicClick =(topicId) => {
    this.props.selectTopic(topicId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.lesson_id !== this.props.lesson_id) {
      axios.get(process.env.REACT_APP_API_URL + '/api/topic?lesson=' + this.props.lesson_id,{ headers: { 'Authorization':  JSON.parse(sessionStorage.getItem("userLoggedIn")).access_token }})
        .then(
          (response) => {
            this.setState({topics: response.data})
            debugger
          }
        )
    }
  }

  render() {
      return (
        <>
        <div className="container-fluid" id={this.props.identify}>
          <div className="row">
            <div className="col">
              {this.state.topics.map(topic =>
                <ModuleCard status="current" key={topic.id} id={topic.id} title={topic.name} deletable="true" deleteOnClick={this.deleteTopic.bind(this, topic.id)} editOnClick={this.selectTopicClick.bind(this, topic.id)}/>
              )}
              <div className="module-card module-new" onClick={this.onOpenModal}>
                <span className="title-card">Adicionar novo tópico</span>
              </div>

            </div>
          </div>
        </div>
        <Modal open={this.state.openModal} onClose={this.onCloseModal} center className="modal-form">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2>Novo tópico</h2>
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

export default TopicTab
