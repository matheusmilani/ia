import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './App'
import ErrorPage from './view/public/error'
import StudentHome from './view/student/home'
import InstructorHome from './view/instructor/home'
import registerServiceWorker from './registerServiceWorker'
import './main.css'

ReactDOM.render(
  (<BrowserRouter>
    <Switch>
      <Route path="/" exact="true" component={App} />
      <Route path="/student" component={StudentHome} />
      <Route path="/instructor" component={InstructorHome} />
      <Route path="*" component={ErrorPage} />
    </Switch>
  </BrowserRouter>)
  , document.getElementById('root'))
registerServiceWorker()
