import { createReference, deleteReference, getAllReference } from './methods'

const routes = (app, passport) => {
  app.post('/references', passport.authenticate('jwt', { session: false }), createReference)
  app.get('/references/:recipientId', passport.authenticate('jwt', { session: false }), getAllReference)
  app.delete('/references/:referenceId/delete', passport.authenticate('jwt', { session: false }), deleteReference)
}

export default routes