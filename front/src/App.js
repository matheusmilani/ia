import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Login from './containers/login/login'

const App = () => (
  <MuiThemeProvider>
    <Login />
  </MuiThemeProvider>
)

export default App
