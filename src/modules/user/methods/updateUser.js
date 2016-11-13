import db from '../../../core/db'
import Promise from 'bluebird'

const pgp = require('pg-promise')();
const helpers = pgp.helpers;

const updateUser = (req, res, next) => {
  const { userId } = req.params;
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
    activities
  } = req.body;
  let kidsAgeJunctionInsertValues;
  let activityJunctionInsertValues;
  const agesUsersColumns       = new helpers.ColumnSet(['user_id', 'kids_age_id'], {table: 'ohhi_user_kids_age'});
  const activitiesUsersColumns = new helpers.ColumnSet(['user_id', 'activity_id'], {table: 'ohhi_user_activity'});

  const lookupKidsAges = () => {
    if (kids_ages && kids_ages.length) {
      let agesQuery = 'SELECT id FROM ohhi_kids_age WHERE kids_age_label IN ($1^)';
      return db.query(agesQuery, pgp.as.csv(kids_ages))
          .then(kidsAgesRecords => {
            kidsAgeJunctionInsertValues = kidsAgesRecords.map((ageRecord) => {
              return {user_id: userId, kids_age_id: ageRecord.id}
            })
          })
          .catch((error) => {
            throw error
          })
    }
  }

  const lookupActivities = () => {
    if (activities && activities.length) {
      let activitiesQuery = 'SELECT id FROM ohhi_activity WHERE activity_label IN ($1^)';
      return db.query(activitiesQuery, pgp.as.csv(activities))
          .then(activityRecords => {
            activityJunctionInsertValues = activityRecords.map((activityRecord) => {
              return {user_id: userId, activity_id: activityRecord.id}
            })
          })
          .catch(error => {
            throw error
          })
    }
  }

  return Promise
    .resolve()
    .then(lookupKidsAges)
    .then(lookupActivities)
    .then(() => {
      db.tx(t => {

        const queries = [
          t.one('UPDATE ohhi_user SET first_name=$1, last_name=$2, birth_date=$3, hometown=$4, profile_picture=$5, introduction=$6, has_kids=$7, has_pets=$8, number_of_kids=$9, about_pets=$10, is_service_member=$11, current_station=$12, facebook=$13, twitter=$14, instagram=$15, pinterest=$16 ' +
          ' WHERE id=$17 RETURNING *', [
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
        ];

        if (kids_ages && kids_ages.length) {
          const userKidsAgeInsert = t.any(helpers.insert(kidsAgeJunctionInsertValues, agesUsersColumns) +
                                          ' ON CONFLICT ON CONSTRAINT user_kids_age_pkey ' +
                                          ' DO NOTHING RETURNING *')

          queries.push(userKidsAgeInsert)
        }

        if (activities && activities.length) {
          const deleteActivitiesFromJunction = t.any('DELETE FROM ohhi_user_activity ' +
                                                    ' WHERE user_id = $1 RETURNING *', [userId]);


          const userActivityInsert = t.any(helpers.insert(activityJunctionInsertValues, activitiesUsersColumns) +
                                          ' RETURNING *')

          queries.push(deleteActivitiesFromJunction, userActivityInsert)
        }

        return t.batch(queries)
      })
      .then(() => {
        return db.query('SELECT u.*, k.kids_age_label, a.activity_label FROM ohhi_user AS u '+
                        ' LEFT JOIN ohhi_user_kids_age AS kj ON kj.user_id = u.id ' +
                        ' LEFT JOIN ohhi_kids_age AS k ON kj.kids_age_id = k.id ' +
                        ' LEFT JOIN ohhi_user_activity AS aj ON aj.user_id = u.id ' +
                        ' LEFT JOIN ohhi_activity AS a ON aj.activity_id = k.id ' +
                        ' WHERE u.id=$1',[userId])
      })
      .then(joinResult => {
        //If there's a way to rewrite the joins so that this hacky logic isn't needed, that would be nice.

        const kidsAges = [];
        const activities = [];

        joinResult.forEach(function(record){
          if (!kidsAges.includes(record.kids_age_label) && record.kids_age_label !== null){
            kidsAges.push(record.kids_age_label)
          }
          if (!activities.includes(record.activity_label) && record.activity_label !== null){
            activities.push(record.activity_label)
          }
        });


        delete joinResult[0].kids_age_label;
        delete joinResult[0].activity_label;
        delete joinResult[0].password;
        joinResult[0].kids_ages = kidsAges;
        joinResult[0].activities = activities;

        res.status(200).json({  message: 'User updated successfully!', success: true, data: joinResult[0] })

      })
      .catch(error => {
        res.status(400).json({ success: false, message: 'Cannot update user information!' })

        return next(error)
      })
    })
}

export default updateUser
