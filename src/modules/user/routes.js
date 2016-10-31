import login from './login'
import register from './register'

const routes = (app, passport) => {
  app.post('/login', passport.authenticate('local-login', { session: false }), (req, res) => {
    res.json(req.user)
  })

  app.post('/register', passport.authenticate('local-signup', { session: false }), (req, res) => {
    res.json(req.user)
  })
}

export default routes