import axios from 'axios';
const defaultUrl = 'http://localhost:5000'
const actions = {
  register: function(email, name, social_name, role, password){
    axios.post(defaultUrl + '/api/user', (
      {email: email,
      name: name,
      social_name: social_name,
      role: role,
      password: password}
    )).then(
        (response) => {
          window.location.replace("/")
        },
        (error) => { return '' }
      )
  },

  login: function(credential, password){
    axios.post(defaultUrl + '/api/authentication', ({username: credential, password: password} ))
      .then(
        (response) => {
          sessionStorage.setItem("userLoggedIn", JSON.stringify(response.data));
          window.location.replace("/" + response.data.roles[0])
        },
        (error) => { return '' }
      )
  },

  logout: function(){
    sessionStorage.removeItem('userLoggedIn');
    window.location.replace('/')
  },

  linkTo: function(role, path){
    window.location.replace('/'+role+'/'+path)
  },

  getUser: function(userId){
    axios.get(defaultUrl + '/api/user?id=' + userId)
      .then(
        (response) => {
          return response.data;
        },
        (error) => { return '' }
      )
  }
}

export default actions;
