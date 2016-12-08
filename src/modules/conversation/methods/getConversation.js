import db from '../../../core/db'

const getById = (req, res, next) => {
  const { id } = req.user
  const { conversationId } = req.params

  db.task(tasks => {
    return tasks.one('SELECT id, initiator_id, recipient_id FROM ohhi_conversation WHERE id=$1 AND (initiator_id=$2 OR recipient_id=$2)', [conversationId, id], conversation => {
      let other = id === conversation.initiator_id ? conversation.recipient_id : conversation.initiator_id

      return tasks.one('SELECT id, first_name, last_name, profile_picture FROM ohhi_user WHERE id=$1', [other], user => {
        conversation.participant = user

        return conversation
      })
    })
    .then(tasks.batch)
  })
  .then(data => res.status(200).json({ message: 'Conversations found!', success: true, data: data }))
  .catch(error => {
    res.status(400).json({ message: 'Cannot find conversations!', success: false })

    return next(error)
  })
}

export default getById
