import Promise from 'bluebird'
import { compare } from 'bcrypt'
import passport from 'passport'
import { Strategy } from 'passport-local'

import db from '../../core/db'

const bcryptCompare = Promise.promisify(compare)

const comparePasswords = (password, hash) => {
  return bcryptCompare(password, hash)
    .then(match => match)
    .catch(error => { throw error })
}

const validateUser = (email, password, cb) => {
  let userInfo = null

  return db.one('SELECT email, password from ohhi_user where email=$1', [email])
    .then(user => {
      userInfo = user
      return comparePasswords(password, user.password)
    })
    .then(match => {
      if (!match) return cb(null, false)

      return cb(null, userInfo.email)
    })
    .catch(error => cb(error))
}

const login = (req, res, next) => {
  const { email, password } = req.body

  validateUser(email, password, next)
    .then(user => {
      res.status(200).json({
        data: email,
        message: 'User found!',
        status: 'success'
      })
    })
    .catch(error => {
      res.status(400).json({
        message: error,
        status: 'failure'
      })
    })
}

const localLogin = (email, password, done) => {
  return validateUser(email, password, done)
}

export { login, localLogin }