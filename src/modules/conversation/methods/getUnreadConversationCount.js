import db from '../../../core/db'

const getUnreadConversationCount = (req, res, next) => {
  const { id } = req.user

  return db.one('SELECT COUNT(*) FROM ohhi_conversation WHERE recipient_id=$1 OR initiator_id=$1 AND is_deleted=false AND unread_by = $1', [id])
  .then(result => {
    result.count = Number(result.count)

    res.status(200).json({ message: 'Conversations found!', success: true, data: result })
  })
  .catch(error => {
    res.status(400).json({ message: 'Cannot find conversations!', success: false })

    return next(error)
  })
}

export default getUnreadConversationCount
