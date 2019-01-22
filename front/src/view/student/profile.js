import React, { Component } from 'react'
import Header from '../../containers/header/header'
import Footer from '../../containers/footer/footer'
import ProfileForm from '../../containers/profile/form'

class Profile extends Component {
  render () {
    return (
      <>
        <Header user_role="student" current_page="profile"/>
        <ProfileForm />
        <Footer/>
      </>
    )
  }
}

export default Profile
