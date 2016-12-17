import db from '../../../core/db'

const updateConvoReadStatus = (req, res, next) => {
  const { conversationId } = req.params

  db.any('UPDATE ohhi_conversation SET unread_by = null WHERE convo_id=$1', [conversationId])
        .then(() => res.status(200).json({ message: 'Conversation successfully marked as read by everyone!', success: true }))
        .catch(error => {
          res.status(400).json({ success: false, message: 'Cannot update unreadBy status on conversation!' })

          return next(error)
        })
}

export default updateConvoReadStatus
