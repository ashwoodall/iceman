import db from '../../../core/db'

const updateReadMessages = (req, res, next) => {
  const { conversationId } = req.params

  db.any('UPDATE ohhi_message SET isread = true WHERE convo_id=$1', [conversationId])
    .then(() => res.status(200).json({ message: 'Message(s) successfully marked as read!', success: true }))
    .catch(error => {
      res.status(400).json({ success: false, message: 'Cannot update isread status on message(s)!' })

      return next(error)
    })
}

export default updateReadMessages
