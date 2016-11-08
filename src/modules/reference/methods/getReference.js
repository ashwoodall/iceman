import config from '../../../../config'
import db from '../../../core/db'

const getReference = (req, res, next) => {
  const { referenceId } = req.params

  db.many('SELECT id, author_id, recipient_id, title, body FROM ohhi_reference WHERE id=$1', [referenceId])
    .then(reference => res.status(200).json({ message: 'References found!', success: true, data: reference }))
    .catch(error => {
      res.status(400).json({ message: 'Cannot find references!', success: false })

      return next(error)
    })
}

export default getReference