import passport from 'passport'

import login from './login'
import register from './register'

const routes = (app, passport) => {
  app.post('/auth/login', login)
  app.post('/auth/register', register)

  // This is a tesst route for jwt authentication
  app.get('/auth/test', passport.authenticate('jwt', { session: false }), (req, res) => {  
    res.send(`User is authenticated! User ID: ${req.user.id}.`);
  })
}

export default routes