import config from '../../../../config'
import db from '../../../core/db'
import helpers from 'pg-promise'

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

  const agesJunctionColumns = new helpers.ColumnSet(['?user_id', 'kids_age_id'],
      {table: 'ohhi_user_kids_age'});

  db.tx(function (t) {

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
    ]

    //If there are kids ages in the request body, look up their primary keys in the kids_ages table so that userId and kids_ageId can then be added to the user/age junction table

    if (kids_ages.length) {
      let agesQuery = "select id from ohhi_kids_age where label=$1"
      kids_ages.forEach(function(age, index){
        if (index > 0 && index < kids_ages.length) {
          agesQuery += (" or label=$" + index)
        }
      })
      return db.any(agesQuery, kids_ages)
        .then(function(kidsAgesIds){
          var junctionInsertValues = kidsAgesIds.map((ageId) => {
            return {user_id: userId, kids_age_id: ageId}
          })

          var query = t.any(helpers.insert(junctionInsertValues, agesJunctionColumns) + " ON CONFLICT DO NOTHING");

          queries.push(query)
        })
        .catch((error) => {
          throw error
        })
    }

    return t.batch(queries);
  })
  .get(3)
  .spread(function (user, kidsAge, activities) {
    console.log(user);

      delete user.password

      res.status(200).json({ message: 'User updated successfully!', success: true, data: user })

    // console.log(kidsAge);
    // console.log(activities);
  })
  .catch(error => {
    console.log("ERROR:", error.message || error);

    res.status(400).json({ success: false, message: 'Cannot update user information!' })

    return next(error)
  })
}

export default updateUser
