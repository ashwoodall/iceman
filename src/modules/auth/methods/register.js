import Promise from 'bluebird'
import { hash, genSalt } from 'bcrypt-nodejs'

import db from '../../../core/db'

const bcryptHash = Promise.promisify(hash)
const bcryptSalt = Promise.promisify(genSalt)

const register = (req, res, next) => {
  const { current_station, email, password } = req.body

  return bcryptSalt(10)
    .then(salt => bcryptHash(password, salt, null))
    .then(hashedPassword => db.none('INSERT INTO ohhi_user(email, password, current_station) values($1, $2, $3)', [email, hashedPassword, current_station]))
    .then(() => res.status(200).json({ message: 'Registration successful!', success: true }))
    .catch(error => {
      res.status(400).json({ success: false, message: 'Registration failed!' })

      return next(error)
    })
}

export default register
