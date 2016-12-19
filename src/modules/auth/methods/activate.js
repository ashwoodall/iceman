import CryptoJS from 'crypto-js'

import db from '../../../core/db'
import secrets from '../../../../secrets'

const activate = (req, res, next) => {
  const { encryptedId } = req.body

  const bytes = CryptoJS.AES.decrypt(encryptedId, secrets.crypto.idSalt)
  const id = Number(bytes.toString(CryptoJS.enc.Utf8))

  return db.any('UPDATE ohhi_user SET is_activated = true WHERE id = $1', [id])
    .then(() => res.status(200).json({ message: 'Account activation successful!', success: true }))
    .catch(error => {
      res.status(400).json({ success: false, message: 'Failed to activate account.' })

      return next(error)
    })
}

export default activate
