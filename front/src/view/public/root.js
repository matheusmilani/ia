import React, { Component } from 'react'

import Particles from 'react-particles-js';
import Login from '../../containers/login/login'

class Root extends Component {
  render () {
    return (
      <div>
        <Particles />
        <Login />
      </div>
    )
  }
}

export default Root
