import config from '../../../../config'
import db from '../../../core/db'

const getAllReference = (req, res, next) => {
  const { recipientId } = req.params

  console.log(recipientId)
  db.many('SELECT id, author_id, recipient_id FROM ohhi_reference WHERE recipient_id=$1', [recipientId])
    .then(references => res.status(200).json({ message: 'references found!', success: true, data: references }))
    .catch(error => {
      res.status(400).json({ message: 'Cannot find references!', success: false })

      return next(error)
    })
}

export default getAllReference