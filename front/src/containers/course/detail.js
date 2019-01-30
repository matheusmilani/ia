import React, { Component } from 'react'
import axios from 'axios';

import ModuleCard from '../../components/module-card/module-card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './detail.css'
import 'react-toastify/dist/ReactToastify.css';

class CourseDetail extends Component {
  state = {
    course: { hot_keys: [] },
    modules: []
  }

  getCourse = () => {
    axios.get(process.env.REACT_APP_API_URL + '/api/course?id=' + this.props.id,{ headers: { 'Authorization':  JSON.parse(sessionStorage.getItem("userLoggedIn")).access_token }})
      .then(
        (response) => {
          this.setState({course: response.data})
        }
      )
  }

  getModules = () => {
    axios.get(process.env.REACT_APP_API_URL + '/api/module?course=' + this.props.id,{ headers: { 'Authorization':  JSON.parse(sessionStorage.getItem("userLoggedIn")).access_token }})
      .then(
        (response) => {
          this.setState({modules: response.data})
        }
      )
  }

  componentDidMount(){
    this.getCourse()
    this.getModules()
  }

  render() {
    if(this.state.course.responsible === JSON.parse(sessionStorage.getItem("userLoggedIn")).id){
      var editable = <span className="edit-course-link" onClick={() => { window.location.href = window.location.origin + '/instructor/course/' + this.props.id + '/edit'}}><FontAwesomeIcon icon="edit" /></span>
    }

    return (
      <>
      <div className="container">
        <div className="row">
          <div className="col">
          <h2 className="title">
            {this.state.course.name}
            {editable}
          </h2>
            {this.state.course.hot_keys.map(function(hot_key){
              return <span key={hot_key.value} className="hot-key">{hot_key.label}</span>
            })}
            <br />
            <br />
            <p>{this.state.course.description}</p>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            {this.state.modules.map(function(module){
              return <ModuleCard status="current" key={module.id} id={module.id} title={module.name}/>
            })}
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default CourseDetail
