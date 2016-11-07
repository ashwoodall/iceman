import config from '../../../config'
import db from '../../core/db'

const disabledUser = (req, res, next) => {
  const { userId } = req.params

  db.one('UPDATE ohhi_user SET disabled=$1 WHERE ID=$2 RETURNING id', [true, userId])
    .then(id => res.status(200).json({ message: 'Account successfully disabled!', success: true }))
    .catch(error => {
      res.status(400).json({ success: false, message: 'Cannot disable account!' })

      return next(error)
    })
}

export default disabledUser