import Promise from 'bluebird'
import { compare } from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'

import config from '../../../../config'
import db from '../../../core/db'

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

  db.one('SELECT first_name, last_name, email, password, id, birth_date, hometown, profile_picture, introduction, has_kids, has_pets, number_of_kids, about_pets, is_service_member, is_activated, current_station, facebook, twitter, instagram, pinterest, completed_profile, disabled FROM ohhi_user WHERE email=$1', [email])
    .then(user => {
      userInfo = user
      return comparePasswords(password, user.password)
    })
    .then(match => {
      if (!match) {
        res.status(401).json({ message: 'Email or password is incorrect', success: false })
      } else {
        delete userInfo.password

        res.status(200).json({ message: 'Authentication successful', success: true, token: `JWT ${generateJwt(userInfo.id)}`, data: userInfo })
      }
    })
    .catch(error => {
      res.status(400).json({ success: false, message: 'Email or password is incorrect' })

      return next(error)
    })
}

export default login
