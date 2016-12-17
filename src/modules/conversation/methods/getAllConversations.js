import db from '../../../core/db'

const getAllConversations = (req, res, next) => {
  const { id } = req.user

  db.task(tasks => {
    return tasks.map('SELECT id, initiator_id, recipient_id FROM ohhi_conversation WHERE recipient_id=$1 OR initiator_id=$1 AND is_deleted=false', [id], conversation => {
      let other = id === conversation.initiator_id ? conversation.recipient_id : conversation.initiator_id

      return tasks.one('SELECT id, first_name, last_name, profile_picture FROM ohhi_user WHERE id=$1', [other], user => {
        conversation.participant = user

        return tasks.one('SELECT * FROM ohhi_message WHERE convo_id=$1 ORDER BY timestamp DESC LIMIT 1', [conversation.id], message => {
          conversation.lastMessage = message

          return conversation
        })
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

export default getAllConversations
