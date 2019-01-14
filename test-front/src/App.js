import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Home from './containers/homeContainer'

const App = () => (
  <MuiThemeProvider>
    <Home />
  </MuiThemeProvider>
)

export default App
