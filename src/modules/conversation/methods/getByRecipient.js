import config from '../../../../config'
import db from '../../../core/db'

const getByRecipient = (req, res, next) => {
  const { recipientId } = req.params

  console.log(recipientId)
  db.many('SELECT id, initiator_id, recipient_id FROM ohhi_conversation WHERE recipient_id=$1', [recipientId])
    .then(conversations => res.status(200).json({ message: 'Conversations found!', success: true, data: conversations }))
    .catch(error => {
      res.status(400).json({ message: 'Cannot find conversations!', success: false })

      return next(error)
    })
}

export default getByRecipient