import { 
  deleteConversation, 
  getAllConversations, 
  getConversation, 
  getUnreadConversationCount, 
  setDeleteFlag, 
  updateConvoReadStatus } from './methods'

const routes = (app, passport) => {
  app.get('/conversations', passport.authenticate('jwt', { session: false }), getAllConversations)
  app.get('/conversations/:conversationId', passport.authenticate('jwt', { session: false }), getConversation)
  app.get('/unread/conversations', passport.authenticate('jwt', { session: false }), getUnreadConversationCount)
  app.delete('/conversations/:conversationId/delete', passport.authenticate('jwt', { session: false }), deleteConversation)
  app.put('/conversations/:conversationId/soft_delete', passport.authenticate('jwt', { session: false }), setDeleteFlag)
  app.put('/conversations/:conversationId/is_read', passport.authenticate('jwt', { session: false }), updateConvoReadStatus)
}

export default routes
