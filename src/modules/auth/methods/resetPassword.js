import Promise from 'bluebird'
import { hash, genSalt } from 'bcrypt-nodejs'
import postmark from 'postmark'

import db from '../../../core/db'
import secrets from '../../../../secrets'

const bcryptHash = Promise.promisify(hash)
const bcryptSalt = Promise.promisify(genSalt)

const resetPassword = (req, res, next) => {
  const { password } = req.body
  const { token } = req.params
  const now = Date.now()

  return bcryptSalt(10)
        .then(salt => bcryptHash(password, salt, null))
        .then(hashedPassword => db.one('UPDATE ohhi_user SET password = $1, reset_password_token = null, reset_token_expiration = null WHERE reset_password_token = $2 AND reset_token_expiration > $3 RETURNING email', [hashedPassword, token, now]))
      .then(record => {
        const client = new postmark.Client(secrets.postmark.key)

        client.sendEmailWithTemplate({
          From: 'hi@oh-hi.us',
          TemplateId: secrets.postmark.resetTemplate,
          To: record.email
        })
      })
      .then(() => res.status(200).json({ message: 'Password reset successful!', success: true }))
        .catch(error => {
          res.status(400).json({ success: false, message: 'Failed to reset password. Reset token may have expired.' })

          return next(error)
        })
}

export default resetPassword
