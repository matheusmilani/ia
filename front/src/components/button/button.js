import React, { Component } from 'react'

import './button.css'

class Button extends Component {
  render() {
    return (
      <button className="btn-login" type={this.props.type}> {this.props.text} </button>
    )
  }
}

export default Button
