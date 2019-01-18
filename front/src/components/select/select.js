import React, { Component } from 'react'

import './select.css'

class Select extends Component {
  render() {
    return (
      <select className="select-text" onChange={this.props.onChange} required={this.props.required} value={this.props.value}>
        <option value="" disabled hidden>{this.props.label}</option>
        <option value="student">Estudante</option>
        <option value="instructor">Instrutor</option>
      </select>
    )
  }
}

export default Select
