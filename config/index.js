
import path from 'path'

const BASE = path.resolve(__dirname, '..')
const NODE_ENV = JSON.stringify(process.env.NODE_ENV)

const config = {
  port     : process.env.PORT || '8080',
  host     : process.env.HOST || 'localhost'
}

config.db = {
  database : 'ohhi'
}

export default config