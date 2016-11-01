import { BasicStrategy } from 'passport-http'

import login from './login'

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

  app.post('/auth/login', (req, res) => 
    login(req.body.email, req.body.password).then(user => {
      return res.status(200).send(user)
    }).catch(error => {
      return res.sendStatus(403)
    })
  )

}

export default routes