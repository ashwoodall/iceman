import db from '../../../core/db'

const getAllbyStation = (req, res, next) => {
  const { station } = req.params
  const { id } = req.user

  db.any('SELECT first_name, last_name, id, birth_date, completed_profile, profile_picture, introduction FROM ohhi_user WHERE current_station=$1 AND is_activated=$2 AND completed_profile=$3 AND disabled=$4', [station, true, true, false])
    .then(users => {

      console.log(users)
      let people = []

      users.map(user => {
        if (user.id !== id) people.push(user)
      })

      res.status(200).json({ message: 'Users found!', success: true, data: people })
    })
    .catch(error => {
      res.status(400).json({ success: false, message: 'Cannot find user!' })

      return next(error)
    })
}

export default getAllbyStation
