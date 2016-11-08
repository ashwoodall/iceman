import { createReference, deleteReference, getAllReferences, getReference } from './methods'

const routes = (app, passport) => {
  app.post('/references', passport.authenticate('jwt', { session: false }), createReference)
  app.get('/references', passport.authenticate('jwt', { session: false }), getAllReferences)
  app.get('/references/:referenceId', passport.authenticate('jwt', { session: false }), getReference)
  app.delete('/references/:referenceId/delete', passport.authenticate('jwt', { session: false }), deleteReference)
}

export default routes