import React, { Component } from 'react'
import axios from 'axios';

import CourseForm from './form'


import './edit.css'
import 'react-toastify/dist/ReactToastify.css';

class CourseEdit extends Component {
  state = {
    course: { hot_keys: [] }
  }

  getCourse = () => {
    axios.get(process.env.REACT_APP_API_URL + '/api/course?id=' + this.props.id,{ headers: { 'Authorization':  JSON.parse(sessionStorage.getItem("userLoggedIn")).access_token }})
      .then(
        (response) => {
          this.setState({course: response.data})
        }
      )
  }

  componentDidMount(){
    this.getCourse()
  }

  render() {

    if(this.state.course.responsible === JSON.parse(sessionStorage.getItem("userLoggedIn")).id){
      return (
        <CourseForm title="Editar curso" data={this.state.course} />
      )
    } else {
      return (
      <>
      <div className="container">
        <div className="row">
          <div className="col">
          <h2 className="title" style={{width: 100 + '%'}}>Desculpe, você não tem permissão de editar esse curso.</h2>
          </div>
        </div>
      </div>
      </>
      )
    }


  }
}

export default CourseEdit
