import React, { Component } from 'react'
import Header from '../../../containers/header/header'
import Footer from '../../../containers/footer/footer'
import NewCourseForm from '../../../containers/course/form'

class CoursesNew extends Component {
  render () {
    return (
      <>
      <Header user_role="instructor" current_page="courses"/>
      <NewCourseForm title="Novo curso"/>
      <Footer/>
      </>
    )
  }
}

export default CoursesNew
