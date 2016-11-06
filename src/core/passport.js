import { ExtractJwt, Strategy } from 'passport-jwt'

import config from '../../config'
import db from './db'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.secret
}

const jwtStrategy = (passport) => {
  passport.use(new Strategy(options, (payload, done) => {
    db.one('SELECT id from ohhi_user where id=$1', [payload])
      .then(user => {
        if (user) return done(null, user)

        return done(null, false)
      })
      .catch(error => done(error, false))
  }))
}

export default jwtStrategy