import { BasicStrategy } from 'passport-http'

import pool from '../../core/db'

const login = (email, password) => {
  return pool.connect().then((error, client, done) => {
    if (error) return console.log('Cannot connect to db', JSON.stringify(error))

    client.query('SELECT email, password from users where email=$1', [email], (error, result) => {
      done()

      if (error) return console.log('Cannot run query', error)

      return console.log(result)
    })
  })
}


export default login