import db from '../../../core/db'

const updateConvoReadStatus = (req, res, next) => {
  const { conversationId } = req.params

  return db.any('UPDATE ohhi_conversation SET unread_by = null WHERE id=$1', [conversationId])
    .then(() => res.status(200).json({ message: 'Conversation successfully marked as read by all participants!', success: true }))
    .catch(error => {
      res.status(400).json({ success: false, message: 'Cannot update unread_by status on conversation!' })

      return next(error)
    })
}

export default updateConvoReadStatus
