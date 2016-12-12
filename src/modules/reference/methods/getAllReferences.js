import db from '../../../core/db'

const getAllReferences = (req, res, next) => {
  const { id } = req.user

  db.task(tasks => {
    return tasks.map('SELECT id, author_id, recipient_id, is_published, body FROM ohhi_reference WHERE recipient_id=$1', [id], reference => {
      return tasks.one('SELECT id, first_name, last_name FROM ohhi_user WHERE id=$1', [id], user => {
        reference.recipient = user

        return reference
      })
    })
    .then(tasks.batch)
  })
  .then(data => res.status(200).json({ message: 'References found!', success: true, data: data }))
  .catch(error => {
    res.status(400).json({ message: 'Cannot find references!', success: false })

    return next(error)
  })
}

export default getAllReferences
