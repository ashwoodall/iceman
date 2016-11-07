import { createConversation, deleteConversation, getByRecipient } from './methods'

const routes = (app, passport) => {
  app.post('/conversations', passport.authenticate('jwt', { session: false }), createConversation)
  app.get('/conversations/:recipientId', passport.authenticate('jwt', { session: false }), getByRecipient)
  app.delete('/conversations/:conversationId/delete', passport.authenticate('jwt', { session: false }), deleteConversation)
}

export default routes