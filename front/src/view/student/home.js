import React, { Component } from 'react'
import Footer from '../../containers/footer/footer'
import Header from '../../containers/header/header'
import CourseRow from '../../containers/course-row/course-row'

class Home extends Component {
  componentDidMount(){
    function speak(text) {
    	var msg = new SpeechSynthesisUtterance();

    	msg.text = text;

    	msg.volume = 1.0;
    	msg.rate = 1.0;
    	msg.pitch = 1.0;
        msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name === "Google português do Brasil"; })[0];

    	window.speechSynthesis.speak(msg);
    }

    speak("Bem vindo, "+ JSON.parse(sessionStorage.getItem("userLoggedIn")).name)
  }
  render () {
    return (
      <>
        <Header user_role="student" current_page="home"/>
        <CourseRow type="my-courses"/>
        <CourseRow type="interests-courses" interest="bla"/>
        <CourseRow type="interests-courses" interest="blabla"/>
        <Footer/>
      </>
    )
  }
}

export default Home
