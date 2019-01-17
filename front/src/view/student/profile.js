import React, { Component } from 'react'
import Header from '../../containers/header/header'
import ProfileForm from '../../containers/profile/profile'

class Profile extends Component {
  render () {
    return (
      <>
      <Header user_role="student" current_page="profile"/>
      <ProfileForm />
      </>
    )
  }
}

export default Profile
