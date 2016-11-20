import db, { pgp } from '../../../core/db'

const lookupActivities = (activities, userId) => {
  return db.query('SELECT id FROM ohhi_activity WHERE activity_label IN ($1^)', pgp.as.csv(activities))
    .then(activityRecords => {
      return activityRecords.map((activityRecord) => {
        return { user_id: userId, activity_id: activityRecord.id }
      })
    })
    .catch((error) => {
      throw error
    })
}

export default lookupActivities
