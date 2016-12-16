import db from '../../../core/db'

const deleteUser = (req, res, next) => {
  const { id } = req.user

  db.one('UPDATE ohhi_user SET disabled=$1 WHERE ID=$2 RETURNING *', [false, id])
    .then(user => {
      delete user.password

      res.status(200).json({ message: 'Account successfully enabled!', success: true, data: user })
    })
    .catch(error => {
      res.status(400).json({ success: false, message: 'Cannot enable account!' })

      return next(error)
    })
}

export default deleteUser
