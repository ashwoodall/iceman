import config from '../../../../config'
import db from '../../../core/db'

const getUser = (req, res, next) => {
  const { userId } = req.params

  db.one('SELECT first_name, last_name, email, id, birth_date, hometown, profile_picture, introduction, has_kids, has_pets, number_of_kids, about_pets, is_service_member, is_registered, current_station, facebook, twitter, instagram, pinterest FROM ohhi_user WHERE id=$1', [userId])
    .then(user => res.status(200).json({ message: 'User found!', success: true, data: user }))
    .catch(error => {
      res.status(400).json({ success: false, message: 'Cannot find user!' })

      return next(error)
    })
}

export default getUser