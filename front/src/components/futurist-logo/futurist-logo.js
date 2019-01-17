import React, { Component } from 'react'

import './futurist-logo.css'
class FuturistLogo extends Component {
  render() {
    return (
      <div className={this.props.current_page + " spinner"}>
        <div className="part">
          <div className="part">
            <div className="part">
              <div className="part">
                <div className="part"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FuturistLogo
