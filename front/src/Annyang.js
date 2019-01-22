import annyang from 'annyang'

class Annyang {
  isSupported() {
    return annyang !== null
  }

  setLanguage(lang) {
    if (annyang) {
      annyang.setLanguage(lang)
    }
  }

  start() {
    if (annyang) {
      annyang.start()
    }
  }

  abort() {
    if (annyang) {
      annyang.abort()
    }
  }

  resume() {
    if (annyang) {
      annyang.resume()
    }
  }

  addCommands(reset, change, undo) {
    if (annyang) {
      annyang.addCommands({
        'Acessar página inicial': function() { window.location.replace('/') },
        'Acessar perfil': function() { window.location.href = window.location.origin + "/" + JSON.parse(sessionStorage.getItem("userLoggedIn")).roles[0]+'/profile' },
        'Acessar cursos': function() { window.location.href = window.location.origin + "/" + JSON.parse(sessionStorage.getItem("userLoggedIn")).roles[0]+'/courses' },
        'Sair': function() { sessionStorage.removeItem('userLoggedIn'); window.location.replace('/') }
      })
    }
  }

  addCallback(engineCallback, resultCallback) {
    if (annyang) {
      annyang.addCallback('start', event => engineCallback('on'))
      annyang.addCallback('soundstart', event => engineCallback('listening'))
      annyang.addCallback('end', event => engineCallback('off'))
      annyang.addCallback('error', event => engineCallback(event.error))
      annyang.addCallback('errorNetwork', event => engineCallback('network error'))
      annyang.addCallback('errorPermissionBlocked', event => engineCallback('permission blocked'))
      annyang.addCallback('errorPermissionDenied', event => engineCallback('permission denied'))
      annyang.addCallback('result', event => resultCallback(event))
    }
  }
}

export default new Annyang()
