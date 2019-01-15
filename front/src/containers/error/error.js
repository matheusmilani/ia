import React, { Component } from 'react'

import Particles from 'react-particles-js';
import Card from '../../components/simple-card/simple-card'
import './error.css'
class Error extends Component {
  render () {
    return (
      <div className="error">
        <Particles />
        <Card type="error" title="Oops!" message="Parece que você entrou em algum lugar que não deveria. Por favor, retorne ao início ou informe ao administrador."/>
      </div>
    )
  }
}

export default Error
