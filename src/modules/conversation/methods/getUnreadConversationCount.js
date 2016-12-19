import db from '../../../core/db'

const getUnreadConversationCount = (req, res, next) => {
  const { id } = req.user
  let count = 0

  return db.task(tasks => {
    return tasks.map('SELECT id, initiator_id, recipient_id, unread_by, last_message_snippet, created_at, updated_at FROM ohhi_conversation WHERE recipient_id=$1 OR initiator_id=$1 AND is_deleted=false', [id], conversation => {
      if (conversation.unread_by === id) count++
    })
    .then(tasks.batch)
  })
  .then(data => {
    res.status(200).json({ message: 'Conversations found!', success: true, data: { count: count } })
  })
  .catch(error => {
    res.status(400).json({ message: 'Cannot find conversations!', success: false })

    return next(error)
  })
}

export default getUnreadConversationCount
