import { createReference, deleteReference, getAllReferences, getPublishedReferences, getReference, publishReference, unpublishReference } from './methods'

const routes = (app, passport) => {
  app.post('/references', passport.authenticate('jwt', { session: false }), createReference)
  app.get('/references', passport.authenticate('jwt', { session: false }), getAllReferences)
  app.get('/references/published', passport.authenticate('jwt', { session: false }), getPublishedReferences)
  app.get('/references/:referenceId', passport.authenticate('jwt', { session: false }), getReference)
  app.put('/references/:referenceId/publish', passport.authenticate('jwt', { session: false }), publishReference)
  app.put('/references/:referenceId/unpublish', passport.authenticate('jwt', { session: false }), unpublishReference)
  app.delete('/references/:referenceId/delete', passport.authenticate('jwt', { session: false }), deleteReference)
}

export default routes
