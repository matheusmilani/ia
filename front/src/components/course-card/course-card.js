import React, { Component } from 'react'

import './course-card.css'

class CourseCard extends Component {
  render() {
    return (
      <div className={"course-card overlay course-" + this.props.status} onClick={() => { window.location.href = window.location.origin + '/instructor/course/' + this.props.id }}>
        <div className="course-image">
          <img src={this.props.image} alt={this.props.title}/>
        </div>
        <span className="title">{this.props.title}</span>
      </div>
    )
  }
}

export default CourseCard
