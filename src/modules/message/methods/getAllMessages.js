import db from '../../../core/db'

const getAllMessages = (req, res, next) => {
  const { conversationId } = req.params

  return db.many('SELECT * FROM ohhi_message WHERE convo_id=$1 AND is_deleted = false ORDER BY created_at ASC', [conversationId])
    .then(result => res.status(200).json({ message: 'Messages found!', success: true, data: result }))
    .catch(error => {
      res.status(400).json({ message: 'Cannot find messages!', success: false })

      return next(error)
    })
}

export default getAllMessages
