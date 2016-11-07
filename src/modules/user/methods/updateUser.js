import config from '../../../../config'
import db from '../../../core/db'

const updateUser = (req, res, next) => {
  const { userId } = req.params
  const { 
    first_name,
    last_name,
    birth_date,
    hometown,
    profile_picture,
    introduction,
    has_kids,
    has_pets,
    number_of_kids,
    about_pets,
    is_service_member,
    current_station,
    facebook,
    twitter,
    instagram,
    pinterest } = req.body

  db.one(`UPDATE ohhi_user SET first_name=$1, last_name=$2, birth_date=$3, hometown=$4, profile_picture=$5, introduction=$6, has_kids=$7, has_pets=$8, number_of_kids=$9, about_pets=$10, is_service_member=$11, current_station=$12, facebook=$13, twitter=$14, instagram=$15, pinterest=$16 WHERE id=$17 RETURNING *`, [
    first_name,
    last_name,
    birth_date,
    hometown,
    profile_picture,
    introduction,
    has_kids,
    has_pets,
    number_of_kids,
    about_pets,
    is_service_member,
    current_station,
    facebook,
    twitter,
    instagram,
    pinterest,
    userId 
  ])
  .then(user => {
    delete user.password

    res.status(200).json({ message: 'User updated successfully!', success: true, data: user })
  })
  .catch(error => {
    res.status(400).json({ success: false, message: 'Cannot update user information!' })

    return next(error)
  })
}

export default updateUser
