import config from '../../../../config'
import db from '../../../core/db'

const getMostRecentMessage = (req, res, next) => {
  const { conversationId } = req.params

  return db.any('SELECT * FROM ohhi_message WHERE convo_id=$1 ORDER BY timestamp DESC LIMIT 1', [conversationId])
    .then(result => res.status(200).json({ message: 'Messages found!', success: true, data: result }))
    .catch(error => {
      res.status(400).json({ message: 'Cannot find messages!', success: false })

      return next(error)
    })
}

export default getMostRecentMessage
