import db from '../../../core/db'

const setDeleteFlag = (req, res, next) => {
  const { conversationId } = req.params

  db.one('UPDATE ohhi_conversation SET is_deleted = true WHERE id=$1', [conversationId])
        .then(() => res.status(200).json({ message: 'Conversation was soft deleted!', success: true }))
        .catch(error => {
          res.status(400).json({ success: false, message: 'Conversation could not be deleted!' })

          return next(error)
        })
}

export default setDeleteFlag
