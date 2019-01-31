import React, { Component } from 'react'
import $ from 'jquery';

import CourseTab from './tab/course-tab'
import ModuleTab from './tab/module-tab'
import LessonTab from './tab/lesson-tab'
import TopicTab from './tab/topic-tab'

import './form.css'
import 'react-toastify/dist/ReactToastify.css';

class CourseForm extends Component {
  state = {
    course: {},
    currentModule: 0,
    currentClass: 0
  }

  handleSelectModule = (selectedModule) => {
    this.setState({module_id: selectedModule});
    this.showClassTab();
  }
  handleSelectLesson = (selectedLesson) => {
    this.setState({lesson_id: selectedLesson});
    this.showTopicTab();
  }

  showCourseTab = () => {
    $("#module-tab").hide()
    $("#topic-tab").hide()
    $("#lesson-tab").hide()
    $("#course-tab").show()
    this.setState({lesson_active: ''})
    this.setState({topic_active: ''})
    this.setState({module_active: ''})
  }

  showModuleTab =() => {
    $("#course-tab").hide()
    $("#topic-tab").hide()
    $("#lesson-tab").hide()
    $("#module-tab").show()
    this.setState({lesson_active: ''})
    this.setState({topic_active: ''})
    this.setState({module_active: 'current'})
  }

  showClassTab =() => {
    $("#course-tab").hide()
    $("#module-tab").hide()
    $("#topic-tab").hide()
    $("#lesson-tab").show()
    this.setState({topic_active: ''})
    this.setState({lesson_active: 'current'})
  }

  showTopicTab =() => {
    $("#course-tab").hide()
    $("#module-tab").hide()
    $("#lesson-tab").hide()
    $("#topic-tab").show()
    this.setState({topic_active: 'current'})
  }

  componentWillMount(){
    if(this.props.data !== undefined){
      this.setState({course: this.props.data})
      this.setState({course_id: this.props.data.id})
    }
  }

  componentDidMount(){
    $("#module-tab").hide()
    $("#lesson-tab").hide()
    $("#topic-tab").hide()
  }

  render() {
    return (
      <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-1">
            <div className="bs-vertical-wizard">
              <ul>
                <li className="current">
                  <span href="#" onClick={this.showCourseTab}></span>
                </li>
                <li className={this.state.module_active}>
                  <span href="#" onClick={this.showModuleTab}></span>
                </li>
                <li className={this.state.lesson_active}>
                  <span href="#!"></span>
                </li>
                <li className={this.state.topic_active}>
                  <span href="#!"></span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-11 profile-form">
            <CourseTab title={this.props.title} data={this.state.course} identify="course-tab" />
            <ModuleTab course_id={this.state.course_id} identify="module-tab" selectModule={this.handleSelectModule}/>
            <LessonTab module_id={this.state.module_id} identify="lesson-tab" selectLesson={this.handleSelectLesson}/>
            <TopicTab module_id={this.state.module_id} identify="topic-tab"/>
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default CourseForm
