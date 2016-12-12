import db from '../../../core/db'

const getAllReferences = (req, res, next) => {
  const { id } = req.user

  db.many('SELECT id, author_id, recipient_id, isPublished, body FROM ohhi_reference WHERE recipient_id=$1', [id])
    .then(references => res.status(200).json({ message: 'References found!', success: true, data: references }))
    .catch(error => {
      res.status(400).json({ message: 'Cannot find references!', success: false })

      return next(error)
    })
}

export default getAllReferences
