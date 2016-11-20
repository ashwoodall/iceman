import chalk from 'chalk'
import express from 'express'
import passport from 'passport'

// Pastport
import jwtStrategy from './core/passport'

// Routes
import auth from './modules/auth/routes'
import conversation from './modules/conversation/routes'
import message from './modules/message/routes'
import reference from './modules/reference/routes'
import user from './modules/user/routes'

const server = (app) => {
  const router = express.Router()

  router.get('/', (req, res) => {
    res.send('You can be my wingman any time')
  })

  // Setup Passport
  console.log(chalk.yellow('[passport] Initializing passport...'))

  app.use(passport.initialize())
  app.use(passport.session())

  jwtStrategy(passport)

  // Setup Routes
  console.log(chalk.yellow('[express] Initializing auth routes...'))

  auth(router, passport)
  conversation(router, passport)
  message(router, passport)
  reference(router, passport)
  user(router, passport)

  app.use('/', router)
}

export default server
