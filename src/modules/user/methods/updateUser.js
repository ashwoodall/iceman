import config from '../../../../config'
import db from '../../../core/db'
import Promise from 'bluebird'

var pgp = require('pg-promise')(/*initialization options*/);
var helpers = pgp.helpers; // `helpers` namespace

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

  var lookupKidsAges = function(){
    if (kids_ages && kids_ages.length) {
      let agesQuery = "select id from ohhi_kids_age where label in ($1^)"
      return db.query(agesQuery, pgp.as.csv(kids_ages))
          .then(function(kidsAgesIds){
            junctionInsertValues = kidsAgesIds.map((ageRecord) => {
              return {user_id: userId, kids_age_id: ageRecord.id}
            })
          })
          .catch((error) => {
            throw error
          })
    }
  }

  return lookupKidsAges()
      .then(function(){
        db.tx(function (t) {

          var t = this;

          const queries = [
            t.one(`UPDATE ohhi_user SET first_name=$1, last_name=$2, birth_date=$3, hometown=$4, profile_picture=$5, introduction=$6, has_kids=$7, has_pets=$8, number_of_kids=$9, about_pets=$10, is_service_member=$11, current_station=$12, facebook=$13, twitter=$14, instagram=$15, pinterest=$16 WHERE id=$17 RETURNING *`, [
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

          const userKidsAgeInsert = t.any(helpers.insert(junctionInsertValues, agesUsersColumns) + " ON CONFLICT DO NOTHING returning *")

          if (kids_ages && kids_ages.length) {
            queries.push(userKidsAgeInsert)
          }

          //If there are kids ages in the request body, look up their primary keys in the kids_ages table so that userId and kids_ageId can then be added to the user/age junction table

          return t.batch(queries)
        })
            .then(function (data) {
              console.log(data); // printing transaction result;

              res.status(200).json(data)
            })
            .catch(error => {
              console.log("ERROR:", error.message || error);

              res.status(400).json({ success: false, message: 'Cannot update user information!' })

              return next(error)
            })
      })
}

export default updateUser
