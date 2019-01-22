import React, { Component } from 'react'

import CourseCard from '../../components/course-card/course-card'
import './course-row.css'

class CourseRow extends Component {

  render () {
    return (
      <div className="course-row my-courses">
        <h2 className="title">Todos os cursos</h2>
        {this.props.data.map(function(course, index){
          return <CourseCard status="current" title={course.name} image='https://picsum.photos/300/200?image=1024'/>
        })}
      </div>
    )
  }
}

export default CourseRow
