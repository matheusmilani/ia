import React, { Component } from 'react'

import Header from '../../../containers/header/header'
import Footer from '../../../containers/footer/footer'
import CourseEdit from '../../../containers/course/edit'

class InstructorCourse extends Component {
  state = { id: '' }

  componentDidMount(){

    this.setState({id: this.props.id})

  }

  render() {
    return (
      <>
      <Header user_role="instructor" current_page="courses"/>
      <CourseEdit id={this.props.id} title="Editar curso"/>
      <Footer/>
      </>
    )
  }
}

export default InstructorCourse
