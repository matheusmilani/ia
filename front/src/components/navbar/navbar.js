import React, { Component } from 'react'
import actions from '../../actions/actions'

import './navbar.css'

class Navbar extends Component {
  actionLogout = () => actions.logout()

  render() {
    if(this.props.role === 'student') {
      return (
          <nav>
            <ul>
              <li>
                <span onClick={this.actionLogout}>Sair</span>
              </li>
            </ul>
          </nav>
      )
    }else if(this.props.role === 'instructor') {
      return (
        <nav>
          <ul>
            <li>
              <span onClick={this.actionLogout}>Sair</span>
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
