import React, { Component } from 'react'
import Header from '../../containers/header/header'
import CourseRow from '../../containers/course-row/course-row'

class Home extends Component {
  render () {
    return (
      <>
      <Header user_role="instructor" current_page="home"/>
      <CourseRow type="my-courses"/>
      <CourseRow type="interests-courses" interest="bla"/>
      <CourseRow type="interests-courses" interest="blabla"/>
      </>
    )
  }
}

export default Home
