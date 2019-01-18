import React, { Component } from 'react'

import './input.css'

class Input extends Component {
  render() {
    return (
      <>
      <label>{this.props.label}</label>
      <input type={this.props.type} className="input-text" placeholder={this.props.placeholder} onChange={this.props.onChange} required={this.props.required} value={this.props.value}/>
      </>
    )
  }
}

export default Input
