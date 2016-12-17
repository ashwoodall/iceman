import { deleteConversation, getAllConversations, getConversation, setDeleteFlag } from './methods'

const routes = (app, passport) => {
  app.get('/conversations', passport.authenticate('jwt', { session: false }), getAllConversations)
  app.get('/conversations/:conversationId', passport.authenticate('jwt', { session: false }), getConversation)
  app.delete('/conversations/:conversationId/delete', passport.authenticate('jwt', { session: false }), deleteConversation)
  app.put('/conversations/:conversationId/soft_delete', passport.authenticate('jwt', { session: false }), setDeleteFlag)
}

export default routes
