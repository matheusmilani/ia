import React, { Component } from 'react'
import Header from '../../containers/header/header'
import Footer from '../../containers/footer/footer'
import ProfileForm from '../../containers/profile/profile'

class Profile extends Component {
  render () {
    return (
      <>
      <Header user_role="instructor" current_page="profile"/>
      <ProfileForm />
      <Footer/>
      </>
    )
  }
}

export default Profile
