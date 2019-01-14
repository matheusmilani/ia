import React from 'react'

import PropTypes from 'prop-types'

import RaisedButton from 'material-ui/RaisedButton'

const Button = ({ label, primary, secondary, onClick }) => <RaisedButton
  label={label}
  primary={primary}
  secondary={secondary}
  onClick={onClick} />

const { string, bool, func } = PropTypes

Button.propTypes = {
  label: string.isRequired,
  primary: bool.isRequired,
  secondary: bool,
  onClick: func.isRequired,
}

export default Button