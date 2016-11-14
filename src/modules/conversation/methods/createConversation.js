import db from '../../../core/db'

const createConversation = (req, res, next) => {
  const { initiator_id, recipient_id } = req.body

  db.none('INSERT INTO ohhi_conversation(initiator_id, recipient_id) values($1, $2)', [initiator_id, recipient_id])
    .then(() => res.status(200).json({ message: 'Conversation created successfully!', success: true }))
    .catch(error => {
      res.status(400).json({ message: 'Cannot create conversation!', success: false })

      return next(error)
    })
}

export default createConversation
