import jwt from 'jsonwebtoken'

import config from '../../../../config'
import db from '../../../core/db'

const getByToken = (req, res, next) => {
  const { authorization } = req.headers

  jwt.verify(authorization.substring(4), config.secret, (err, user) => {
    if (err) throw err

    db.one('SELECT email, id FROM ohhi_user WHERE id=$1', [user])
      .then(user => {
        res.status(200).json({ message: 'User id found by token!', success: true, token: authorization, data: user })
      })
      .catch(error => {
        res.status(400).json({ success: false, message: 'Cannot find id by Token!' })

        return next(error)
      })
  })
}

export default getByToken