import React, { Component } from 'react'
import axios from 'axios';

import Header from '../../../containers/header/header'
import Footer from '../../../containers/footer/footer'
import CourseRow from '../../../containers/course-row/course-row'

class CoursesIndex extends Component {
  state = {
    all_courses: []
  }

  all_courses = () => {
    axios.get(process.env.REACT_APP_API_URL + '/api/course',{ headers: { 'Authorization':  JSON.parse(sessionStorage.getItem("userLoggedIn")).access_token }})
      .then(
        (response) => {
          this.setState({all_courses: response.data})
        }
      )
  }

  actionNewCourse = (role) => {this.linkTo(role, '')}

  linkTo = (role, path) => {
    window.location.href = window.location.origin + '/instructor/course/new'
  }

  componentDidMount(){
    this.all_courses()
  }

  render () {
    return (
      <>
      <Header user_role="instructor" current_page="courses"/>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <span className="btn-new-course" onClick={() => {this.actionNewCourse(this.props.role)}}>Novo Curso</span>
          </div>
        </div>
      </div>

      <CourseRow type="all" data={this.state.all_courses} title="Todos os cursos"/>
      <Footer/>
      </>
    )
  }
}

export default CoursesIndex
