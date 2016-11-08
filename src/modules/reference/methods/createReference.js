import config from '../../../../config'
import db from '../../../core/db'

const createReference = (req, res, next) => {
  const { 
    author_id,
    recipient_id,
    title,
    body } = req.body


  db.none('INSERT INTO ohhi_reference(author_id, recipient_id, title, body, isPublished) VALUES($1, $2, $3, $4, $5)', [author_id, recipient_id, title, body, false])
    .then(() => res.status(200).json({ message: 'Reference created successfully!', success: true }))
    .catch(error => {
      res.status(400).json({ message: 'Cannot create reference!', success: false })

      return next(error)
    })
}

export default createReference