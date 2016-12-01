// Core
import bodyParser from 'body-parser'
import chalk from 'chalk'
import express from 'express'
import http from 'http'
import morgan from 'morgan'
import cors from 'cors'
import socket from 'socket.io'

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

const httpServer = http.createServer(app)
const io = socket(httpServer)

app.set('io', io)

server(app, io)

io.on('connection', (socket) => {
  socket.emit('connected', { connected: true })
  socket.on('disconnect', () => { console.log('user disconnected') })
})

httpServer.listen(config.port, error => {
  if (error)
    console.error(chalk.red(error))
  else
    console.log(chalk.green(`[express] API Listening at http://${config.host}:${config.port}`))
})


