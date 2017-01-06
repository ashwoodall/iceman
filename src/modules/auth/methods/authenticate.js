import Promise from 'bluebird'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

import secrets from '../../../../secrets'
import db from '../../../core/db'
import { authenticationSchema } from '../../validation'

const bcryptCompare = Promise.promisify(compare)

const comparePasswords = (password, hash) => {
  return bcryptCompare(password, hash)
    .then(match => match)
    .catch(error => { throw error })
}

const generateJwt = (id) => {
  return jwt.sign({ id: id }, secrets.jwt, { expiresIn: '1h' })
}

const login = (req, res, next) => {
  let userInfo = null
  let passwordMatch = null

  const { email, password } = req.body

  // Validate payload
  req.checkBody(authenticationSchema)
  const errors = req.validationErrors()

  if (errors) {
    return res.status(400).json(errors)
  }

  db.one('SELECT first_name, last_name, email, password, id, birth_date, hometown, profile_picture, introduction, has_kids, has_pets, number_of_kids, about_pets, is_service_member, is_activated, current_station, facebook, twitter, instagram, pinterest, completed_profile, disabled FROM ohhi_user WHERE email=$1 AND is_activated=$2', [email, true])
    .then(user => {
      userInfo = user

      return comparePasswords(password, user.password)
    })
    .then(match => {
      passwordMatch = match
    })
    .delay(750)
    .then(() => {
      if (!passwordMatch) {
        res.status(401).json({ message: 'Email or password is incorrect', success: false })
      } else {
        delete userInfo.password

        res.status(200).json({ message: 'Authentication successful', success: true, token: `JWT ${generateJwt(userInfo.id)}`, data: userInfo })
      }
    })
    .catch(error => {
      if (error.message === 'No data returned from the query.') {
        res.status(400).json({ success: false, message: 'Account must be activated before logging in.' })
      } else {
        res.status(400).json({ success: false, message: 'Email or password is incorrect' })
      }

      return next(error)
    })
}

export default login
