import db from '../../../core/db'

const getById = (req, res, next) => {
  const { id } = req.user
  const { conversationId } = req.params

  db.one('SELECT id, initiator_id, recipient_id FROM ohhi_conversation WHERE id=$1 AND (initiator_id=$2 OR recipient_id=$2)', [conversationId, id])
    .then(conversation => res.status(200).json({ message: 'Conversation found!', success: true, data: conversation }))
    .catch(error => {
      res.status(400).json({ message: 'Cannot find conversation!', success: false })

      return next(error)
    })
}

export default getById
