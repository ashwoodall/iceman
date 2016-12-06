import db, { pgp } from '../../../core/db'
import Promise from 'bluebird'

const helpers = pgp.helpers

const updateUser = (req, res, next) => {
  const { id } = req.user
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
    pinterest,
    kids_ages,
    activities,
    completed_profile
  } = req.body

  let kidsAgeJunctionInsertValues
  let activityJunctionInsertValues

  const lookupKidsAges = () => {
    if (kids_ages && kids_ages.length) {
      return db.query('SELECT id FROM ohhi_kids_age WHERE kids_age_label IN ($1^)', pgp.as.csv(kids_ages))
          .then(kidsAgesRecords => {
            kidsAgeJunctionInsertValues = kidsAgesRecords.map((ageRecord) => {
              return { user_id: id, kids_age_id: ageRecord.id }
            })
          })
          .catch((error) => {
            throw error
          })
    }
  }

  const lookupActivities = () => {
    if (activities && activities.length) {
      return db.query('SELECT id FROM ohhi_activity WHERE activity_label IN ($1^)', pgp.as.csv(activities))
          .then(activityRecords => {
            activityJunctionInsertValues = activityRecords.map((activityRecord) => {
              return { user_id: id, activity_id: activityRecord.id }
            })
          })
          .catch(error => {
            throw error
          })
    }
  }

  // Queries executed in the same batch/transaction will be rolled back if any one of them fails.
  const batchQueries = () => {
    db.tx(transaction => {
      const queries = [
        transaction.one('UPDATE ohhi_user SET first_name=$1, last_name=$2, birth_date=$3, hometown=$4, profile_picture=$5, introduction=$6, has_kids=$7, has_pets=$8, number_of_kids=$9, about_pets=$10, is_service_member=$11, current_station=$12, facebook=$13, twitter=$14, instagram=$15, pinterest=$16, completed_profile=$17 WHERE id=$18 RETURNING *', [
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
          completed_profile,
          id
        ])
      ]

      if (kids_ages && kids_ages.length) {
        const agesUsersColumns = new helpers.ColumnSet(['user_id', 'kids_age_id'], { table: 'ohhi_user_kids_age' })
        const deleteKidsAgesFromJunction = transaction.any('DELETE FROM ohhi_user_kids_age WHERE user_id = $1 RETURNING *', [id])
        const userKidsAgeInsert = transaction.any(helpers.insert(kidsAgeJunctionInsertValues, agesUsersColumns) + ' RETURNING *')

        queries.push(deleteKidsAgesFromJunction, userKidsAgeInsert)
      }

      if (activities && activities.length) {
        const activitiesUsersColumns = new helpers.ColumnSet(['user_id', 'activity_id'], { table: 'ohhi_user_activity' })
        const deleteActivitiesFromJunction = transaction.any('DELETE FROM ohhi_user_activity WHERE user_id = $1 RETURNING *', [id])
        const userActivityInsert = transaction.any(helpers.insert(activityJunctionInsertValues, activitiesUsersColumns) + ' RETURNING *')

        queries.push(deleteActivitiesFromJunction, userActivityInsert)
      }

      return transaction.batch(queries)
    })
  }

  const joinResults = () => {
    return db.tx(transaction => {
      const queries = [
        transaction.one('SELECT first_name, last_name, birth_date, hometown, profile_picture, introduction, has_kids, has_pets, number_of_kids, about_pets, is_service_member, current_station, facebook, twitter, instagram, pinterest, completed_profile from ohhi_user WHERE id=$1', [id]),
        transaction.query('SELECT kids_age_label FROM ohhi_user_kids_age LEFT JOIN ohhi_kids_age ON ohhi_kids_age.id = ohhi_user_kids_age.kids_age_id where ohhi_user_kids_age.user_id=$1', [id]),
        transaction.query('SELECT activity_label FROM ohhi_user_activity LEFT JOIN ohhi_activity ON ohhi_activity.id = ohhi_user_activity.activity_id where ohhi_user_activity.user_id=$1', [id])
      ]

      return transaction.batch(queries)
    })
  }

  const cleanUpResults = (user, kids_ages, activities) => {
    user.kids_ages = kids_ages.map(function (record) {
      return record.kids_age_label
    })
    user.activities = activities.map(function (record) {
      return record.activity_label
    })

    res.status(200).json({ message: 'User updated successfully!', success: true, data: user })
  }

  return Promise
      .resolve()
      .then(lookupKidsAges)
      .then(lookupActivities)
      .then(batchQueries)
      .then(joinResults)
      .spread(cleanUpResults)
      .catch(error => {
        res.status(400).json({ success: false, message: 'Cannot update user information!' })

        return next(error)
      })
}

export default updateUser
