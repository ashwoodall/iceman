import passport from 'passport'

import { login } from './login'
import register from './register'

const requireLogin = passport.authenticate('local', { session: false })

const routes = (app, passport) => {
  app.post('/auth/login', requireLogin, login)
  app.post('/auth/register', register)
}

export default routes