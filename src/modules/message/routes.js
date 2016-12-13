import { createMessage, getAllMessages, getMostRecentMessage, updateReadMessages, deleteMessage } from './methods'

const routes = (app, passport) => {
  app.post('/messages', passport.authenticate('jwt', { session: false }), createMessage)
  app.get('/messages/:conversationId', passport.authenticate('jwt', { session: false }), getAllMessages)
  app.get('/messages/mostrecent/:conversationId', passport.authenticate('jwt', { session: false }), getMostRecentMessage)
  app.put('/messages/updatereadstatus/:conversationId', passport.authenticate('jwt', { session: false }), updateReadMessages)
  app.put('/messages/deletemessage/:messageId', passport.authenticate('jwt', { session: false }), deleteMessage)
}

export default routes
