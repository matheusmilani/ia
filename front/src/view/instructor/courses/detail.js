import React, { Component } from 'react'
import axios from 'axios';

import Header from '../../../containers/header/header'
import Footer from '../../../containers/footer/footer'
import CourseDetail from '../../../containers/course/detail'

class InstructorCourse extends Component {
  state = { id: '' }

  componentDidMount(){

    this.setState({id: this.props.id})

  }

  render() {
    return (
      <>
      <Header user_role="instructor" current_page="courses"/>
      <CourseDetail id={this.props.id} />
      <Footer/>
      </>
    )
  }
}

export default InstructorCourse
