// Core
import express from 'express'
import bodyParser from 'body-parser'
import chalk from 'chalk'
import cors from 'cors'

// Config
import config from '../config'

// Servers
import server from '../src/server'

const app = express()

app.use(cors())

// Setup server
console.log(chalk.yellow('[express] Initializing content...'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Setup passport
console.log(chalk.yellow('[express] Initializing api...'))

server(app)

app.listen(config.port, error => {
  if (error)
    console.error(chalk.red(error))
  else
    console.log(chalk.green(`[express] APP Listening at http://${config.host}:${config.db.port}`))
})


