import Promise from 'bluebird'
import { hash } from 'bcrypt'

import db from '../../core/db'

const bcryptHash = Promise.promisify(hash)

const register = (req, res, next) => {
  const { email, password } = req.body

  return bcryptHash(password, 8)
    .then(hashedPassword => {
        return db.none('INSERT INTO ohhi_user(email, password) values($1, $2)', [email, hashedPassword])
    })
    .then(() => {
      res.status(200).json({
        message: 'User registered!',
        status: 'success'
      })
    })
    .catch(error => {
      return next(error)
    })
}

export default register