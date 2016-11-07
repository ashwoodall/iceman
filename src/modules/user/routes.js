import deleteUser from './deleteUser'
import disableUser from './disableUser'
import getUser from './getUser'
import updateUser from './updateUser'

const routes = (app, passport) => {
  app.get('/user/:userId', passport.authenticate('jwt', { session: false }), getUser)
  app.put('/user/:userId', passport.authenticate('jwt', { session: false }), updateUser)
  app.put('/user/:userId/disable', passport.authenticate('jwt', { session: false }), disableUser)
  app.post('/user/:userId/delete', passport.authenticate('jwt', { session: false }), deleteUser)
}

export default routes