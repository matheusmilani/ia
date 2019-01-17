import React, { Component } from 'react'

import Particles from 'react-particles-js';
import Navbar from '../../components/navbar/navbar'
import FuturistLogo from '../../components/futurist-logo/futurist-logo'

import './header.css'
class Header extends Component {
  render() {
    return (
      <header className={this.props.current_page + ' header'}>
        <Particles />
        <FuturistLogo current_page={this.props.current_page}/>
        <Navbar role={this.props.user_role}/>
      </header>
    )
  }
}

export default Header
