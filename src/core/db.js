import bluebird from 'bluebird'
import pg from 'pg-promise'

import config from '../../config'

const options = {
  promiseLib: bluebird
}

export const pgp = pg(options)

const db = pgp(config.db)

export default db
