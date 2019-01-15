import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import App from './App'
import ErrorPage from './view/public/error'
import StudentHome from './view/student/home'
import InstructorHome from './view/instructor/home'
import registerServiceWorker from './registerServiceWorker'
import './main.css'

export function isLoggedIn(){ return sessionStorage.getItem("userLoggedIn") ? true : false }

ReactDOM.render(
  (<BrowserRouter>
    <Switch>
      <Route path="/" exact="true" component={App} />
      <Route path="/student" render={() => ( isLoggedIn() ? <StudentHome/> : <Redirect to="/"/> )} />
      <Route path="/instructor"  render={() => ( isLoggedIn() ? <InstructorHome/> : <Redirect to="/"/> )}  />
      <Route path="*" component={ErrorPage} />
    </Switch>
  </BrowserRouter>)
  , document.getElementById('root'))
registerServiceWorker()
