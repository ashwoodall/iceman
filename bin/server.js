// Core
import bodyParser from 'body-parser'
import chalk from 'chalk'
import express from 'express'
import http from 'http'
import morgan from 'morgan'
import cors from 'cors'

// Config
import config from '../config'

// Servers
import server from '../src/server'

const app = express()

app.use(cors())

// Setup server
console.log(chalk.yellow('[express] Initializing server...'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))

server(app)

const httpServer = http.createServer(app)

httpServer.listen(config.port, error => {
  if (error)
    console.error(chalk.red(error))
  else
    console.log(chalk.green(`[express] API Listening at http://${config.host}:${config.port}`))
})


