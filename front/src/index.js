import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

import App from './App'
import ErrorPage from './view/public/error'

// Student components
import StudentHome from './view/student/home'
import StudentProfile from './view/student/profile'
import StudentCourses from './view/student/courses/index'

// Instructor components
import InstructorHome from './view/instructor/home'
import InstructorProfile from './view/instructor/profile'
import InstructorCourses from './view/instructor/courses/index'
import InstructorCoursesNew from './view/instructor/courses/new'
import InstructorCourseDetail from './view/instructor/courses/detail'
import InstructorCourseEdit from './view/instructor/courses/edit'

import registerServiceWorker from './registerServiceWorker'
import annyang from './Annyang'

import './main.css'
import 'bootstrap/dist/css/bootstrap.css';

const authSession = sessionStorage.getItem("userLoggedIn")
export function isLoggedIn(){ return authSession ? true : false }
export function asStudent(){ return JSON.parse(authSession).roles[0] === 'student' ? true : false }
export function asInstructor(){ return JSON.parse(authSession).roles[0] === 'instructor' ? true : false }

require('dotenv').config();

annyang.setLanguage('pt-BR')
annyang.addCommands();
annyang.start();

library.add(faTrash, faEdit);


ReactDOM.render(
  (<BrowserRouter>
    <Switch>
      <Route path="/" exact render={() => ( isLoggedIn() ? asStudent() ? <StudentHome/> : <InstructorHome/> : <App/> )} />

      <Route path="/student/courses" render={() => ( isLoggedIn() ? asInstructor() ? <StudentCourses/> : <Redirect to="/instructor"/> : <Redirect to="/"/> )} />
      <Route path="/student/profile" render={() => ( isLoggedIn() ? asStudent() ? <StudentProfile/> : <Redirect to="/student"/> : <Redirect to="/"/> )} />
      <Route path="/student" render={() => ( isLoggedIn() ? asStudent() ? <StudentHome/> : <Redirect to="/instructor"/> : <Redirect to="/"/> )} />

      <Route path="/instructor/course/new" render={() => ( isLoggedIn() ? asInstructor() ? <InstructorCoursesNew/> : <Redirect to="/student"/> : <Redirect to="/"/> )} />
      <Route path="/instructor/course/:id/edit" render={({match}) => ( isLoggedIn() ? asInstructor() ? <InstructorCourseEdit id={match.params.id}/> : <Redirect to="/student"/> : <Redirect to="/"/> )} />
      <Route path="/instructor/course/:id" render={({match}) => ( isLoggedIn() ? asInstructor() ? <InstructorCourseDetail id={match.params.id}/> : <Redirect to="/student"/> : <Redirect to="/"/> )} />
      <Route path="/instructor/courses" render={() => ( isLoggedIn() ? asInstructor() ? <InstructorCourses/> : <Redirect to="/student"/> : <Redirect to="/"/> )} />
      <Route path="/instructor/profile" render={() => ( isLoggedIn() ? asInstructor() ? <InstructorProfile/> : <Redirect to="/student"/> : <Redirect to="/"/> )} />
      <Route path="/instructor" render={() => ( isLoggedIn() ? asInstructor() ? <InstructorHome/> : <Redirect to="/student"/> : <Redirect to="/"/> )} />

      <Route path="*" component={ErrorPage} />
    </Switch>
  </BrowserRouter>)
  , document.getElementById('root'))
registerServiceWorker()
