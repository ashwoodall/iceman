import db from '../../../core/db'

const createMessage = (req, res, next) => {
  const { id } = req.user
  const { recipient_id, body } = req.body

  const createMessageAndConvoIfNotExists = function (record) {
    if (record.length) {
      const convoId = record[0].id
      return db.one('INSERT INTO ohhi_message(author, convo_id, body) values($1, $2, $3) RETURNING *', [id, convoId, body])
    } else {
      return db.task(task => {
        return task.one('INSERT INTO ohhi_conversation(initiator_id, recipient_id) values($1, $2) RETURNING *', [id, recipient_id])
            .then(function (conversation) {
              const convoId = conversation.id
              return task.one('INSERT INTO ohhi_message(author, convo_id, body) values($1, $2, $3) RETURNING *', [id, convoId, body])
            })
      })
    }
  }

  return db.any('SELECT id FROM ohhi_conversation WHERE (initiator_id = $1 AND recipient_id=$2 AND is_deleted=false) OR (initiator_id = $2 AND recipient_id=$1 AND is_deleted=false)', [id, recipient_id])
      .then(createMessageAndConvoIfNotExists)
      .then((result) => {
        res.status(200).json({ message: 'Message created successfully!', success: true, data: result })
      })
      .catch(error => {
        res.status(400).json({ message: 'Cannot create message!', success: false })

        return next(error)
      })
}

export default createMessage
