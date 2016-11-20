import db, { pgp } from '../../../core/db'

const lookupKidsAges = (ages, userId) => {
  return db.query('SELECT id FROM ohhi_kids_age WHERE kids_age_label IN ($1^)', pgp.as.csv(ages))
    .then(kidsAgesRecords => {
      return kidsAgesRecords.map((ageRecord) => {
        return { user_id: userId, kids_age_id: ageRecord.id }
      })
    })
    .catch((error) => {
      throw error
    })
}

export default lookupKidsAges
