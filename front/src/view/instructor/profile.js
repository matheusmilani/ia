import React, { Component } from 'react'
import Header from '../../containers/header/header'
import ProfileForm from '../../containers/profile/profile'

class Profile extends Component {
  render () {
    return (
      <>
      <Header user_role="instructor" current_page="profile"/>
      <h2 class="title">Meu perfil</h2>
      <ProfileForm />
      </>
    )
  }
}

export default Profile
