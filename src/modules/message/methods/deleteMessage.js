import db from '../../../core/db'

const deleteMessage = (req, res, next) => {
  const { messageId } = req.params

  db.one('UPDATE ohhi_message SET is_deleted = true WHERE id=$1', [messageId])
        .then(() => res.status(200).json({ message: 'Message was soft deleted!', success: true }))
        .catch(error => {
          res.status(400).json({ success: false, message: 'Message could not be deleted!' })

          return next(error)
        })
}

export default deleteMessage
