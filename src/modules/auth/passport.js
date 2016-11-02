import passport from 'passport'
import { Strategy } from 'passport-local'

import { localLogin } from './login'

const options = { usernameField: 'email' }

passport.use(new Strategy(options, localLogin))