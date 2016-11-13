import config from '../../../../config'
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
  let junctionInsertValues;
  const agesUsersColumns = new helpers.ColumnSet(['user_id', 'kids_age_id'], {table: 'ohhi_user_kids_age'});

  const lookupKidsAges = () => {
    if (kids_ages && kids_ages.length) {
      let agesQuery = "select id from ohhi_kids_age where label in ($1^)"
      return db.query(agesQuery, pgp.as.csv(kids_ages))
          .then(kidsAgesIds => {
            junctionInsertValues = kidsAgesIds.map((ageRecord) => {
              return {user_id: userId, kids_age_id: ageRecord.id}
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
          const userKidsAgeInsert = t.any(helpers.insert(junctionInsertValues, agesUsersColumns) +
              " ON CONFLICT ON CONSTRAINT user_kids_age_pkey " +
              " DO NOTHING returning *")

          queries.push(userKidsAgeInsert)
        }

        return t.batch(queries)
      })
      .then(() => {
        return db.query("select u.*, k.label from ohhi_user as u " +
            " left join ohhi_user_kids_age as j on j.user_id = u.id " +
            " left join ohhi_kids_age as k on j.kids_age_id = k.id " +
            " where u.id=$1",[userId])
      })
      .then(joinResult => {
        const kidsAges = [];

        joinResult.forEach(function(record){
          kidsAges.push(record.label)
        });

        delete joinResult[0].label;
        delete joinResult[0].password;
        joinResult[0].kids_ages = kidsAges;

        res.status(200).json({  message: 'User updated successfully!', success: true, data: joinResult[0] })

      })
      .catch(error => {
        console.log("ERROR:", error.message || error);

        res.status(400).json({ success: false, message: 'Cannot update user information!' })

        return next(error)
      })
    })
}

export default updateUser
