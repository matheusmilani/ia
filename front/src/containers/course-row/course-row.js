import React, { Component } from 'react'

import CourseCard from '../../components/course-card/course-card'
import './course-row.css'
class CourseRow extends Component {
  render () {
    if(this.props.type === 'my-courses') {
      return (
        <div className="course-row my-courses">
          <h2 className="title">Meus Cursos</h2>
          <CourseCard status="completed" title="Título 01" image="https://picsum.photos/300/200?image=1024"/>
          <CourseCard status="failed" title="Título 02" image="https://picsum.photos/300/200?image=1024" />
          <CourseCard status="current" title="Título 03" image="https://picsum.photos/300/200?image=1024" />
          <CourseCard status="current" title="Título 03" image="https://picsum.photos/300/200?image=1024" />
        </div>
      )
    }

    if(this.props.type === 'interests-courses') {
      return (
        <div className="course-row my-courses">
          <h2 className="title">Porque você se interessou por {this.props.interest}</h2>
          <CourseCard status="completed" title="Título 01" image="https://picsum.photos/300/200?image=1024"/>
          <CourseCard status="failed" title="Título 02" image="https://picsum.photos/300/200?image=1024" />
          <CourseCard status="current" title="Título 03" image="https://picsum.photos/300/200?image=1024" />
          <CourseCard status="current" title="Título 03" image="https://picsum.photos/300/200?image=1024" />
        </div>
      )
    }

  }
}

export default CourseRow
