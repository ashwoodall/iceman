import config from '../../../../config'
import db from '../../../core/db'

const deleteConversation = (req, res, next) => {
  const { conversationId } = req.params

  db.one('DELETE FROM ohhi_conversation WHERE ID=$1 RETURNING id', [conversationId])
    .then(id => res.status(200).json({ message: 'Conversation successfully deleted!', success: true }))
    .catch(error => {
      res.status(400).json({ success: false, message: 'Cannot delete conversation!' })

      return next(error)
    })
}

export default deleteConversation