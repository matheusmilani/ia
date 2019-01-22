import React, { Component } from 'react'
import Header from '../../../containers/header/header'
import Footer from '../../../containers/footer/footer'
import CourseRow from '../../../containers/course-row/course-row'

class CoursesIndex extends Component {
  render () {
    return (
      <>
      <Header user_role="student" current_page="courses"/>
      <CourseRow type="my-courses"/>
      <Footer/>
      </>
    )
  }
}

export default CoursesIndex
