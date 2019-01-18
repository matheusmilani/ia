import React, { Component } from 'react'

import './textarea.css'

class TextArea extends Component {
  render() {
    return (
      <textarea className="textarea-text" placeholder={this.props.placeholder} onChange={this.props.onChange} required={this.props.required} value={this.props.value}>
      </textarea>
    )
  }
}

export default TextArea
