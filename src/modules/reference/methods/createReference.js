import db from '../../../core/db'

const createReference = (req, res, next) => {
  const { id } = req.user
  const { recipient_id, body } = req.body

  db.one('SELECT * FROM ohhi_reference WHERE author_id=$1 AND recipient_id=$2', [id, recipient_id])
    .then(reference => res.status(400).json({ message: 'Reference already exists', success: false }))
    .catch(error => {
      if (error.received === 0) {
        db.none('INSERT INTO ohhi_reference(author_id, recipient_id, body, is_published) VALUES($1, $2, $3, $4)', [id, recipient_id, body, false])
          .then(() => res.status(200).json({ message: 'Reference created successfully!', success: true }))
          .catch(error => {
            res.status(400).json({ message: 'Cannot create reference!', success: false })

            return next(error)
          })
      } else {
        res.status(400).json({ message: 'Cannot create reference!', success: false })
      }
    })
}

export default createReference
