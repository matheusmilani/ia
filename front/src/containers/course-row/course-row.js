import React, { Component } from 'react'

import CourseCard from '../../components/course-card/course-card'
import './course-row.css'

class CourseRow extends Component {

  render () {
    return (
      <div className="course-row my-courses">
        <h2 className="title">Todos os cursos</h2>
        {this.props.data.map(function(course){
          return <CourseCard status="current" key={course.id} id={course.id} title={course.name} image={course.photo}/>
        })}
      </div>
    )
  }
}

export default CourseRow
