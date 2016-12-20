import Promise from 'bluebird'
import { hash, genSalt } from 'bcrypt-nodejs'
import postmark from 'postmark'
import CryptoJS from 'crypto-js'

import db from '../../../core/db'
import secrets from '../../../../secrets'

const bcryptHash = Promise.promisify(hash)
const bcryptSalt = Promise.promisify(genSalt)

const register = (req, res, next) => {
  const { current_station, email, password } = req.body

  return bcryptSalt(10)
    .then(salt => bcryptHash(password, salt, null))
    .then(hashedPassword => db.one('INSERT INTO ohhi_user(email, password, current_station) values($1, $2, $3) RETURNING id', [email, hashedPassword, current_station]))
      .then((record) => {
        const client = new postmark.Client(secrets.postmark.key)

        console.log(record)

        const encryptedId = CryptoJS.AES.encrypt(record.id.toString(), secrets.crypto.idSalt)

        client.sendEmailWithTemplate({
          From: 'hi@oh-hi.us',
          TemplateId: secrets.postmark.activationTemplate,
          To: email,
          TemplateModel: {
            activationUrl: `http://www.app.oh-hi.us/activate?encoded=${encodeURIComponent(encryptedId.toString())}`
          }
        })
      })
    .then(() => res.status(200).json({ message: 'Registration successful!', success: true }))
    .catch(error => {
      res.status(400).json({ success: false, message: 'That email address is already associated with an account. You may log in or enter a different email address' })

      return next(error)
    })
}

export default register
