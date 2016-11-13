import { deleteUser, disableUser, getById, getByToken, updateUser } from './methods'

const routes = (app, passport) => {
  app.get('/user/by/token', passport.authenticate('jwt', { session: false }), getByToken)
  app.get('/user/:userId', passport.authenticate('jwt', { session: false }), getById)
  app.put('/user/:userId', passport.authenticate('jwt', { session: false }), updateUser)
  app.put('/user/:userId/disable', passport.authenticate('jwt', { session: false }), disableUser)
  app.delete('/user/:userId/delete', passport.authenticate('jwt', { session: false }), deleteUser)
}

export default routes