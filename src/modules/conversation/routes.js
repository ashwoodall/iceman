import { createConversation, deleteConversation, getAllConversations, getConversation } from './methods'

const routes = (app, passport) => {
  app.post('/conversations', passport.authenticate('jwt', { session: false }), createConversation)
  app.get('/conversations', passport.authenticate('jwt', { session: false }), getAllConversations)
  app.get('/conversations/:conversationId', passport.authenticate('jwt', { session: false }), getConversation)
  app.delete('/conversations/:conversationId/delete', passport.authenticate('jwt', { session: false }), deleteConversation)
}

export default routes