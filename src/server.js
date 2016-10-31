import chalk from 'chalk'
import mongoose from 'mongoose'
import passport from 'passport'
import socketIo from 'socket.io'

import config from '../config'

// Passport auth
import login from './modules/user/login'
import register from './modules/user/register'

// Routes
import userRoutes from './modules/user/routes'

const server = (app) => {

  // Setup Mongo
  console.log(chalk.yellow('[mongo] Initializing mongo...'))

  mongoose.Promise = global.Promise
  mongoose.connect(config.db.url)

  // Setup Passport
  console.log(chalk.yellow('[passport] Initializing passport...'))

  app.use(passport.initialize())
  app.use(passport.session())

  passport.use('local-login', login)
  passport.use('local-signup', register)

  // Setup Routes
  console.log(chalk.yellow('[express] Initializing api routes...'))

  userRoutes(app, passport)

}

export default server