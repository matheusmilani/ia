import React, { Component } from 'react'

import './input.css'

class Input extends Component {
  render() {
    return (
      <input type={this.props.type} className="input-text" placeholder={this.props.placeholder} onChange={this.props.onChange} required={this.props.required}/>
    )
  }
}

export default Input
