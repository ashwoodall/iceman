import chalk from 'chalk'
import pg from 'pg'

import config from '../../config'

const pool = new pg.Pool(config.db)

pool.on('error', (error, client) => {
  console.log(chalk.red(`[postgress] ${error.message}`))
})

export default pool