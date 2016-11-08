import config from '../../../../config'
import db from '../../../core/db'

const getReferenceById = (req, res, next) => {
  const { referenceId } = req.params

  console.log(referenceId)
  db.many('SELECT id, author_id, recipient_id FROM ohhi_reference WHERE id=$1', [referenceId])
    .then(references => res.status(200).json({ message: 'References found!', success: true, data: references }))
    .catch(error => {
      res.status(400).json({ message: 'Cannot find references!', success: false })

      return next(error)
    })
}

export default getReferenceById