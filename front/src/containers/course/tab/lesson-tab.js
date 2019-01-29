import React, { Component } from 'react'
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import ModuleCard from '../../../components/module-card/module-card'
import Input from '../../../components/input/input'
import TextArea from '../../../components/textarea/textarea'
import Button from '../../../components/button/button'

import Modal from 'react-responsive-modal';

import 'react-toastify/dist/ReactToastify.css';

class LessonTab extends Component {
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
    lessons: [],
    openModal: false
  }

  onOpenModal = () => {
    this.setState({ openModal: true });
  };

  onCloseModal = () => {
    this.setState({ openModal: false });
  };

  getLessons = () => {
    axios.get(process.env.REACT_APP_API_URL + '/api/lesson?module=' + this.props.module_id,{ headers: { 'Authorization':  JSON.parse(sessionStorage.getItem("userLoggedIn")).access_token }})
      .then(
        (response) => {
          this.setState({lessons: response.data})
        }
      )
  }

  handleNameChange = event => this.setState({name: event.target.value})
  handleDescriptionChange = event => this.setState({description: event.target.value})
  handleSubmit = event => {
    event.preventDefault();
    this.notify()
    axios.post(process.env.REACT_APP_API_URL + '/api/lesson',
      {
      name: this.state.name,
      description: this.state.description,
      module_id: this.props.module_id,
      required: true,
      position: 1
    },
    { headers: { 'Authorization':  JSON.parse(sessionStorage.getItem("userLoggedIn")).access_token }}
    ).then(
        (response) => { this.success("Dados salvos com sucesso."); this.getLessons(); this.setState({ openModal: false }) },
        (error) => { this.error("Erro ao salvar dados.") }
      )
  }

  deleteLesson = (id_lesson) => {
    this.notify()
    axios.delete(process.env.REACT_APP_API_URL + '/api/lesson',
    {data: {
      id: id_lesson,
      headers: { 'Authorization':  JSON.parse(sessionStorage.getItem("userLoggedIn")).access_token }
    }}
    ).then(
        (response) => { this.success("Módulo deletado com sucesso."); this.getLessons(); },
        (error) => { this.error("Erro ao deletar aula.") }
      )
  }

  selectLessonClick =(lessonId) => {
    this.props.selectLesson(lessonId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.module_id !== this.props.module_id) {
      axios.get(process.env.REACT_APP_API_URL + '/api/lesson?module=' + this.props.module_id,{ headers: { 'Authorization':  JSON.parse(sessionStorage.getItem("userLoggedIn")).access_token }})
        .then(
          (response) => {
            this.setState({lessons: response.data})
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
              {this.state.lessons.map(lesson =>
                <ModuleCard status="current" key={lesson.id} id={lesson.id} title={lesson.name} deletable="true" deleteOnClick={this.deleteLesson.bind(this, lesson.id)} editOnClick={this.selectLessonClick.bind(this, lesson.id)}/>
              )}
              <div className="module-card module-new" onClick={this.onOpenModal}>
                <span className="title-card">Adicionar nova aula</span>
              </div>

            </div>
          </div>
        </div>
        <Modal open={this.state.openModal} onClose={this.onCloseModal} center className="modal-form">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2>Nova aula</h2>
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

export default LessonTab
