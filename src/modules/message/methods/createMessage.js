import db from '../../../core/db'

const createMessage = (req, res, next) => {
  const { id } = req.user
  const { convo_id, body } = req.body

  return db.any('INSERT INTO ohhi_message(author, convo_id, body) values($1, $2, $3) RETURNING *', [id, convo_id, body])
    .then((result) => {
      res.status(200).json({ message: 'Message created successfully!', success: true, data: result })
    })
    .catch(error => {
      res.status(400).json({ message: 'Cannot create message!', success: false })

      return next(error)
    })
}

export default createMessage
