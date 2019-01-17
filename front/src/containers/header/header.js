import React, { Component } from 'react'

import Particles from 'react-particles-js';
import Navbar from '../../components/navbar/navbar'

import './header.css'
class Header extends Component {
  render() {
    return (
      <header>
        <Particles />
        <div class="spinner">
          <div class="part">
            <div class="part">
              <div class="part">
                <div class="part">
                  <div class="part"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Navbar role={this.props.user_role}/>
      </header>
    )
  }
}

export default Header
