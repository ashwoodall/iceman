import db from '../../../core/db'

const deleteUser = (req, res, next) => {
  const { id } = req.user

  db.none('DELETE FROM ohhi_user WHERE ID=$1', [id])
    .then(id => res.status(200).json({ message: 'Account successfully deleted!', success: true }))
    .catch(error => {
      res.status(400).json({ success: false, message: 'Cannot delete account!' })

      return next(error)
    })
}

export default deleteUser
