import Promise from 'bluebird'
import { compare } from 'bcrypt'

import db from '../../core/db'

const bcryptCompare = Promise.promisify(compare)

const comparePasswords = (password, hash) => {
  return bcryptCompare(password, hash)
    .then(match => match)
    .catch(error => { throw error })
}

const login = (req, res, next) => {
  let userInfo = null

  const { email, password } = req.body

  db.one('SELECT email, password from ohhi_user where email=$1', [email])
    .then(user => {
      userInfo = user
      return comparePasswords(password, user.password)
    })
    .then(match => {
      if (!match) {
        res.status(400).json({
          message: 'Password is incorrect!',
          state: 'failure'
        })
      } else {
        res.status(200).json({
          data: userInfo.email,
          message: 'User found!',
          status: 'success'
        })
      }
    })
    .catch(error => {
      return next(error)
    })
}


export default login