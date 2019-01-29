import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './module-card.css'

class ModuleCard extends Component {

  render() {
    if(this.props.deletable === "true"){
      var deletable = <span className="module-card-action" onClick={this.props.deleteOnClick}><FontAwesomeIcon icon="trash" /></span>
      var editable = <span className="module-card-action" onClick={this.props.editOnClick}><FontAwesomeIcon icon="edit" /></span>
    }
    return (
      <>
      <div className={"module-card module-" + this.props.status} onClick={this.onOpenModal}  id={this.props.identify}>
        {deletable}
        {editable}
        <span className="title-card">{this.props.title}</span>
      </div>
      </>
    )
  }
}

export default ModuleCard
