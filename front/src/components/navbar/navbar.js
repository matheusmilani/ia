import React, { Component } from 'react'
import actions from '../../actions/actions'
import $ from 'jquery';
import './navbar.css'

class Navbar extends Component {
  actionLogout = () => actions.logout()
  actionProfile = (role) => {actions.linkTo(role, 'profile')}

  scroll = () => {
    $(window).scroll(function (event) {
      var scrollHeight = $(window).scrollTop();
      if (scrollHeight > 100) {
        $("nav").addClass("active")
      } else {
        $("nav").removeClass("active")
      }
    });
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
                <span onClick={() => {this.actionProfile(this.props.role)}}>Perfil</span>
              </li>
              <li>
                <span>Cursos</span>
              </li>
              <li>
                <span onClick={() => {this.actionLogout()}}>Sair</span>
              </li>
            </ul>
          </nav>
      )
    }else if(this.props.role === 'instructor') {
      return (
        <nav>
          <ul>
            <li>
              <span onClick={() => {this.actionProfile(this.props.role)}}>Perfil</span>
            </li>
            <li>
              <span>Cursos</span>
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
