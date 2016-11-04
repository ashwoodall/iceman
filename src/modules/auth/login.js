import Promise from 'bluebird'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

import config from '../../../config'
import db from '../../core/db'

const bcryptCompare = Promise.promisify(compare)

const comparePasswords = (password, hash) => {
  return bcryptCompare(password, hash)
    .then(match => match)
    .catch(error => { throw error })
}

const generateJwt = (id) => {
 return jwt.sign(id, config.secret)
}

const login = (req, res, next) => {
  let userInfo = null

  const { email, password } = req.body

  db.one('SELECT email, id, password from ohhi_user where email=$1', [email])
    .then(user => {
      userInfo = user

      return comparePasswords(password, user.password)
    })
    .then(match => {
      if (!match) {
        res.status(401).json({ message: 'Authentication failed! Password is incorrect.', success: false })
      } else {
        res.status(200).json({ message: 'Authentication successful!', success: true, token: `JWT ${generateJwt(userInfo.id)}` })
      }
    })
    .catch(error => {
      res.status(400).json({ success: false, message: 'Authentication failed!' })

      return next(error)
    })
}

export default login