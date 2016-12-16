import { deleteUser, disableUser, getAllbyStation, getById, getByToken, updateUser, getCredentials } from './methods'

const routes = (app, passport) => {
  app.get('/user/by/token', passport.authenticate('jwt', { session: false }), getByToken)
  app.get('/user/:userId', passport.authenticate('jwt', { session: false }), getById)
  app.get('/users/:station', passport.authenticate('jwt', { session: false }), getAllbyStation)
  app.get('/s3_credentials', passport.authenticate('jwt', { session: false }), getCredentials)
  app.put('/user', passport.authenticate('jwt', { session: false }), updateUser)
  app.put('/user/:userId/disable', passport.authenticate('jwt', { session: false }), disableUser)
  app.put('/user/:userId/delete', passport.authenticate('jwt', { session: false }), deleteUser)
}

export default routes
