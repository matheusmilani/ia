import React, { Component } from 'react'

import './simple-card.css'

class Card extends Component {
  render() {
    return (
      <div className={this.props.type + " card"}>
        <p className="card-title">{this.props.title}</p>
        <p className="card-message">{this.props.message}</p>
      </div>
    )
  }
}

export default Card
