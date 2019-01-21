import React, { Component } from 'react'
import Header from '../../containers/header/header'
import Footer from '../../containers/footer/footer'
import CourseRow from '../../containers/course-row/course-row'

class Courses extends Component {
  render () {
    return (
      <>
      <Header user_role="instructor" current_page="courses"/>
      <CourseRow type="my-courses"/>
      <Footer/>
      </>
    )
  }
}

export default Courses
