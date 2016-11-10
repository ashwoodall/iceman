import Promise from 'bluebird'
import { hash } from 'bcrypt-nodejs'

import db from '../../../core/db'

const bcryptHash = Promise.promisify(hash)

const register = (req, res, next) => {
  const { email, password } = req.body

  return bcryptHash(password, 8)
    .then(hashedPassword => db.none('INSERT INTO ohhi_user(email, password) values($1, $2)', [email, hashedPassword]))
    .then(() => res.status(200).json({ message: 'Registration successful!', success: true }))
    .catch(error => {
      res.status(400).json({ success: false, message: 'Registration failed!' })

      return next(error)
    })
}

export default register