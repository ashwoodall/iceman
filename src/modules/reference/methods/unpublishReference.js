import db from '../../../core/db'

const unpublishReference = (req, res, next) => {
  const { referenceId } = req.params

  db.none('UPDATE ohhi_reference SET is_published=$1 WHERE ID=$2', [false, referenceId])
    .then(id => res.status(200).json({ message: 'Reference successfully unpublished!', success: true }))
    .catch(error => {
      res.status(400).json({ success: false, message: 'Cannot unpublished reference!' })

      return next(error)
    })
}

export default unpublishReference