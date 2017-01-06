import jwt from 'jsonwebtoken'

import secrets from '../../../../secrets'
import db from '../../../core/db'

const getByToken = (req, res, next) => {
  const { authorization } = req.headers

  jwt.verify(authorization.substring(4), secrets.jwt, (err, user) => {
    if (err) res.status(400).json({ success: false, message: 'Cannot find user!' })

    return db.tx(transaction => {
      const queries = [
        transaction.one('SELECT first_name, last_name, birth_date, id, hometown, profile_picture, introduction, has_kids, has_pets, number_of_kids, about_pets, is_service_member, current_station, facebook, twitter, instagram, pinterest, completed_profile, disabled from ohhi_user WHERE id=$1', [user]),
        transaction.query('SELECT kids_age_label FROM ohhi_user_kids_age LEFT JOIN ohhi_kids_age ON ohhi_kids_age.id = ohhi_user_kids_age.kids_age_id where ohhi_user_kids_age.user_id=$1', [user]),
        transaction.query('SELECT activity_label FROM ohhi_user_activity LEFT JOIN ohhi_activity ON ohhi_activity.id = ohhi_user_activity.activity_id where ohhi_user_activity.user_id=$1', [user])
      ]

      return transaction.batch(queries)
    })
    .spread((user, kids_ages, activities) => {
      user.kids_ages = kids_ages.map(function (record) {
        return record.kids_age_label
      })
      user.activities = activities.map(function (record) {
        return record.activity_label
      })

      res.status(200).json({ message: 'User Found', success: true, data: user })
    })
    .catch(error => {
      res.status(400).json({ success: false, message: 'Cannot find user!' })

      return next(error)
    })
  })
}

export default getByToken
