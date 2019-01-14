import React from 'react'

import PropTypes from 'prop-types'

import TextField from 'material-ui/TextField'

const Input = ({ hintText, type }) => <TextField
  hintText={hintText}
  type={type} />

const { string } = PropTypes

Input.propTypes = {
  hintText: string.isRequired,
  type: string.isRequired,
}

export default Input