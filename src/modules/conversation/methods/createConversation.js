import db from '../../../core/db'

const createConversation = (req, res, next) => {
  const { id } = req.user
  const { recipient_id } = req.body

  db.tx(transactions => {
    return transactions.batch([
      transactions.any('SELECT * FROM ohhi_conversation WHERE initiator_id=$1 AND recipient_id=$2', [id, recipient_id]),
      transactions.any('SELECT * FROM ohhi_conversation WHERE initiator_id=$1 AND recipient_id=$2', [recipient_id, id])
    ])
  })
  .spread((one, two) => {
    if (!one.length && !two.length) {
      db.none('INSERT INTO ohhi_conversation(initiator_id, recipient_id) values($1, $2)', [id, recipient_id])
        .then(() => res.status(200).json({ message: 'Conversation created successfully', success: true }))
        .catch(error => {
          res.status(400).json({ message: 'Conversation could not be created', success: false })

          return error
        })
    } else {
      res.status(400).json({ message: 'Conversation already exists', success: false })
    }
  })
  .catch(error => {
    res.status(400).json({ message: 'Conversation could not be created', success: false })

    return error
  })

}

export default createConversation
