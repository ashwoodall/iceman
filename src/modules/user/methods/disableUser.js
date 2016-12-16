import db from '../../../core/db'

const disableUser = (req, res, next) => {
  const { id } = req.user

  db.one('UPDATE ohhi_user SET disabled=$1 WHERE ID=$2 RETURNING *', [true, id])
    .then(user => {
      delete user.password

      res.status(200).json({ message: 'Account successfully disabled!', success: true, data: user })
    })
    .catch(error => {
      res.status(400).json({ success: false, message: 'Cannot disable account!' })

      return next(error)
    })
}

export default disableUser
