import db from '../../../core/db'

const getAllbyStation = (req, res, next) => {
  const { station } = req.params

  db.many('SELECT first_name, last_name, email, id, birth_date, hometown, profile_picture, introduction, has_kids, has_pets, number_of_kids, about_pets, is_service_member, is_registered, current_station, facebook, twitter, instagram, pinterest FROM ohhi_user WHERE current_station=$1', [station])
    .then(users => res.status(200).json({ message: 'Users found!', success: true, data: users }))
    .catch(error => {
      res.status(400).json({ success: false, message: 'Cannot find user!' })

      return next(error)
    })
}

export default getAllbyStation
