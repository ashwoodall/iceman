import crypto from 'crypto'
import postmark from 'postmark'

import db from '../../../core/db'
import secrets from '../../../../secrets'

const forgotPassword = (req, res, next) => {
  const { email } = req.body
  const token = crypto.randomBytes(20).toString('hex')
  const tokenExpiration = Date.now() + 3600000

  return db.any('UPDATE ohhi_user SET reset_password_token = $1, reset_token_expiration = $2 WHERE email = $3 RETURNING id', [token, tokenExpiration, email])
    .then(() => {
      var client = new postmark.Client(secrets.postmark.key)

      client.sendEmailWithTemplate({
        From: 'hi@oh-hi.us',
        TemplateId: secrets.postmark.forgotTemplate,
        To: email,
        TemplateModel: {
          resetUrl: 'http://www.app.oh-hi.us/reset/' + token
        }
      })
    })
    .then(() => res.status(200).json({ message: 'Forgot password process successful! A reset email has been sent to the user.', success: true }))
    .catch(error => {
      res.status(400).json({ success: false, message: 'Failed to send password reset email to the user.' })

      return next(error)
    })
}

export default forgotPassword
