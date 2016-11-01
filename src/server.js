import chalk from 'chalk'
import express from 'express'
import passport from 'passport'

// Routes
import auth from './modules/auth/routes'

const server = (app) => {

  const router = express.Router()

  router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' })   
  })

  // Setup Passport
  console.log(chalk.yellow('[passport] Initializing passport...'))

  app.use(passport.initialize())
  app.use(passport.session())

  // Setup Routes
  console.log(chalk.yellow('[express] Initializing auth routes...'))

  auth(router, passport)

  app.use('/', router)

}

export default server