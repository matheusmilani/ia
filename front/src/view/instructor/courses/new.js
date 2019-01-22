import React, { Component } from 'react'
import Header from '../../../containers/header/header'
import Footer from '../../../containers/footer/footer'
import NewCourseForm from '../../../containers/new-course/form'

class CoursesNew extends Component {
  render () {
    return (
      <>
      <Header user_role="instructor" current_page="courses"/>
      <NewCourseForm />
      <Footer/>
      </>
    )
  }
}

export default CoursesNew
