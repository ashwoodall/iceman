import { deleteUser, disableUser, enableUser, getAllbyStation, getById, getByToken, updateUser, getCredentials } from './methods'

const routes = (app, passport) => {
  app.get('/user/by/token', getByToken)
  app.get('/user/:userId', passport.authenticate('jwt', { session: false }), getById)
  app.put('/user', passport.authenticate('jwt', { session: false }), updateUser)
  app.put('/user/:userId/disable', passport.authenticate('jwt', { session: false }), disableUser)
  app.put('/user/:userId/enable', passport.authenticate('jwt', { session: false }), enableUser)
  app.put('/user/:userId/delete', passport.authenticate('jwt', { session: false }), deleteUser)
  app.get('/users/:station', passport.authenticate('jwt', { session: false }), getAllbyStation)
  app.get('/s3_credentials', passport.authenticate('jwt', { session: false }), getCredentials)
}

export default routes
