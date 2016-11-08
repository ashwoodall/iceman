import config from '../../../../config'
import db from '../../../core/db'

const getById = (req, res, next) => {
  const { conversationId } = req.params
  
  db.many('SELECT id, initiator_id, recipient_id FROM ohhi_conversation WHERE id=$1', [conversationId])
    .then(conversations => res.status(200).json({ message: 'Conversations found!', success: true, data: conversations }))
    .catch(error => {
      res.status(400).json({ message: 'Cannot find conversations!', success: false })

      return next(error)
    })
}

export default getById