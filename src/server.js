import chalk from 'chalk'
import express from 'express'
import passport from 'passport'

// Pastport
import jwtStrategy from './core/passport'

// Routes
import auth from './modules/auth/routes'

const server = (app) => {

  const router = express.Router()

  router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
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

  app.use('/', router)

}

export default server