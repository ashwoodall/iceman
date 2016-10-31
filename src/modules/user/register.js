import { Strategy } from 'passport-local'

import User from './schema'

const register = (email, password, done) => {
  User.findOne({ 'account.email': email }, (err, user) => {
    if (err) return done(err)
    if (user) return done(null, false)
      
    let newUser = new User()

    newUser.account.email = email
    newUser.account.password = newUser.generatePassword(password)

    newUser.save((err, user) => {
      if (err) throw err

      return done(null, newUser)
    })
  })
}

export default new Strategy({ usernameField: 'email' }, register)