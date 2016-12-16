import db from '../../../core/db'

const deleteUser = (req, res, next) => {
  const { id } = req.user

  db.one('UPDATE ohhi_user SET disabled=$1 WHERE ID=$2 RETURNING id', [id])
    .then(id => res.status(200).json({ message: 'Account successfully deleted!', success: true }))
    .catch(error => {
      res.status(400).json({ success: false, message: 'Cannot delete account!' })

      return next(error)
    })
}

export default deleteUser
