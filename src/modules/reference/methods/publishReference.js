import db from '../../../core/db'

const publishReference = (req, res, next) => {
  const { referenceId } = req.params

  db.one('UPDATE ohhi_reference isPublished=$1 WHERE ID=$2', [true, referenceId])
    .then(id => res.status(200).json({ message: 'Reference successfully published!', success: true }))
    .catch(error => {
      res.status(400).json({ success: false, message: 'Cannot published reference!' })

      return next(error)
    })
}

export default publishReference
