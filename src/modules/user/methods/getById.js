import db from '../../../core/db'

const getUser = (req, res, next) => {
  const { userId } = req.params

    return db.query('SELECT u.*, k.kids_age_label, a.activity_label FROM ohhi_user AS u '+
        ' LEFT JOIN ohhi_user_kids_age AS kj ON kj.user_id = u.id ' +
        ' LEFT JOIN ohhi_kids_age AS k ON kj.kids_age_id = k.id ' +
        ' LEFT JOIN ohhi_user_activity AS aj ON aj.user_id = u.id ' +
        ' LEFT JOIN ohhi_activity AS a ON aj.activity_id = k.id ' +
        ' WHERE u.id=$1',[userId])
    .then(joinResult => {
        //If there's a way to rewrite the joins so that this hacky logic isn't needed, that would be nice.

        const kidsAges = []
        const activities = []

        joinResult.forEach(function(record){
            if (!kidsAges.includes(record.kids_age_label) && record.kids_age_label !== null){
                kidsAges.push(record.kids_age_label)
            }
            if (!activities.includes(record.activity_label) && record.activity_label !== null){
                activities.push(record.activity_label)
            }
        })


        delete joinResult[0].kids_age_label
        delete joinResult[0].activity_label
        delete joinResult[0].password
        joinResult[0].kids_ages = kidsAges
        joinResult[0].activities = activities

        res.status(200).json({ message: 'User found!', success: true, data: joinResult[0] })
    })
    .catch(error => {
      res.status(400).json({ success: false, message: 'Cannot find user!' })

      return next(error)
    })
}

export default getUser