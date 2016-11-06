import getUser from './getUser'
import saveUser from './saveUser'

const routes = (app, passport) => {
  app.get('/user/:userId', passport.authenticate('jwt', { session: false }), getUser)
  app.post('/user/:userId', passport.authenticate('jwt', { session: false }), saveUser)
}

export default routes