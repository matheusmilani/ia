import React, { Component } from 'react'
import axios from 'axios';

import Footer from '../../containers/footer/footer'
import Header from '../../containers/header/header'
import CourseRow from '../../containers/course-row/course-row'

class Home extends Component {
  state = {
    all_courses: []
  }

  all_courses = () => {
    axios.get(process.env.REACT_APP_API_URL + '/api/course',{ headers: { 'Authorization':  JSON.parse(sessionStorage.getItem("userLoggedIn")).access_token }})
      .then(
        (response) => {
          this.setState({all_courses: response.data})
          console.log(response)
        }
      )
  }

  speak = (text) => {
    var msg = new SpeechSynthesisUtterance();

    msg.text = text;

    msg.volume = 1.0;
    msg.rate = 1.0;
    msg.pitch = 1.0;
    msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name === "Google português do Brasil"; })[0];

    window.speechSynthesis.speak(msg);
  }

  componentDidMount(){
    this.all_courses()
    this.speak("Welcome, user! I am a robot teacher. For what can I help you?")
  }
  render () {
    return (
      <>
        <Header user_role="student" current_page="home"/>
        <CourseRow type="all" data={this.state.all_courses} title="Todos os cursos"/>
        <Footer/>
      </>
    )
  }
}

export default Home
