
import path from 'path'

const BASE = path.resolve(__dirname, '..')
const NODE_ENV = JSON.stringify(process.env.NODE_ENV)

const config = {
  port     : process.env.PORT || '3000',
  host     : process.env.HOST || 'localhost'
}

config.db = {
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database : 'ohhi'
}

export default config