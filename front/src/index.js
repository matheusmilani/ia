import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import App from './App'
import ErrorPage from './view/public/error'
import StudentHome from './view/student/home'
import InstructorHome from './view/instructor/home'
import registerServiceWorker from './registerServiceWorker'
import './main.css'

const authSession = sessionStorage.getItem("userLoggedIn")

export function isLoggedIn(){ return authSession ? true : false }
export function asStudent(){ return JSON.parse(authSession).roles[0] === 'student' ? true : false }
export function asInstructor(){ return JSON.parse(authSession).roles[0] === 'instructor' ? true : false }

ReactDOM.render(
  (<BrowserRouter>
    <Switch>
      <Route path="/" exact render={() => ( isLoggedIn() ? asStudent() ? <StudentHome/> : <InstructorHome/> : <App/> )} />
      <Route path="/student" render={() => ( isLoggedIn() ? asStudent() ? <StudentHome/> : <Redirect to="/instructor"/> : <Redirect to="/"/> )} />
      <Route path="/instructor" render={() => ( isLoggedIn() ? asInstructor() ? <InstructorHome/> : <Redirect to="/student"/> : <Redirect to="/"/> )} />
      <Route path="*" component={ErrorPage} />
    </Switch>
  </BrowserRouter>)
  , document.getElementById('root'))
registerServiceWorker()
