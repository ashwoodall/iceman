import getUser from './getUser'
import updateUser from './updateUser'

const routes = (app, passport) => {
  app.get('/user/:userId', passport.authenticate('jwt', { session: false }), getUser)
  app.put('/user/:userId', passport.authenticate('jwt', { session: false }), updateUser)
}

export default routes