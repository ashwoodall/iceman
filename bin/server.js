// Core
import express from 'express'
import bodyParser from 'body-parser'
import chalk from 'chalk'

// Config
import config from '../config'

// Servers
import server from '../src/server'

const app = express()

// Setup server
console.log(chalk.yellow('[express] Initializing server...'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('port', config.port)

server(app)

app.listen(config.port, error => {
  if (error)
    console.error(chalk.red(error))
  else
    console.log(chalk.green(`[express] API Listening at http://${config.host}:${config.port}`))
})


