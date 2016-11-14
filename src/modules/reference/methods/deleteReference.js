import db from '../../../core/db'

const deleteReference = (req, res, next) => {
  const { referenceId } = req.params

  db.one('DELETE FROM ohhi_reference WHERE ID=$1 RETURNING id', [referenceId])
    .then(id => res.status(200).json({ message: 'Reference successfully deleted!', success: true }))
    .catch(error => {
      res.status(400).json({ success: false, message: 'Cannot delete reference!' })

      return next(error)
    })
}

export default deleteReference
