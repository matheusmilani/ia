import React, { Component } from 'react'
import $ from 'jquery';
import './navbar.css'

class Navbar extends Component {
  actionLogout = () => this.logout()
  actionCourses = (role) => {this.linkTo(role, 'courses')}
  actionProfile = (role) => {this.linkTo(role, 'profile')}
  actionIndex = (role) => {this.linkTo(role, '')}

  linkTo = (role, path) => {
    window.location.replace('/'+role+'/'+path)
  }

  scroll = () => {
    $(window).scroll(function (event) {
      var scrollHeight = $(window).scrollTop();
      if (scrollHeight > 10) {
        $("nav").addClass("active")
      } else {
        $("nav").removeClass("active")
      }
    });
  }

  logout = () => {
    sessionStorage.removeItem('userLoggedIn');
    window.location.replace('/')
  }

  componentDidMount(){
    this.scroll()
  }

  render() {
    if(this.props.role === 'student') {
      return (
          <nav>
            <ul>
              <li>
                <span onClick={() => {this.actionIndex(this.props.role)}}>AI Teacher</span>
              </li>
              <li>
                <span onClick={() => {this.actionProfile(this.props.role)}}>Perfil</span>
              </li>
              <li>
                <span>Cursos</span>
              </li>
              <li>
                <span onClick={() => {this.logout()}}>Sair</span>
              </li>
            </ul>
          </nav>
      )
    }else if(this.props.role === 'instructor') {
      return (
        <nav>
          <ul>
            <li>
              <span onClick={() => {this.actionIndex(this.props.role)}}>AI Teacher</span>
            </li>
            <li>
              <span onClick={() => {this.actionProfile(this.props.role)}}>Perfil</span>
            </li>
            <li>
              <span onClick={() => {this.actionCourses(this.props.role)}}>Cursos</span>
            </li>
            <li>
                <span onClick={() => {this.actionLogout()}}>Sair</span>
            </li>
          </ul>
        </nav>
      )
    }else {
      return (<></>)
    }
  }
}

export default Navbar
