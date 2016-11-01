import { BasicStrategy } from 'passport-http'

import login from './login'
import register from './register'

const strat = {
  usernameField: 'email', 
  passwordField: 'password'
}

const routes = (app, passport) => {

  passport.use(new BasicStrategy(strat, (email, password, done) => {
    return login(email, password)
      .then(user => done(null, user))
      .catch(error => {
        if (error) return done(err)
        return done(null, false)
      })
  }))

  app.post('/auth/login', login)
  app.post('/auth/register', register)
}

export default routes