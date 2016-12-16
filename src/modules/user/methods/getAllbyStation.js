import db from '../../../core/db'

const getAllbyStation = (req, res, next) => {
  const { station } = req.params

  db.many('SELECT first_name, last_name, id, birth_date, profile_picture, introduction FROM ohhi_user WHERE current_station=$1', [station])
    .then(users => {
      let people = []

      users.map(user => {
        if (completed_profile) people.push(user)
      })

      res.status(200).json({ message: 'Users found!', success: true, data: people })
    })
    .catch(error => {
      res.status(400).json({ success: false, message: 'Cannot find user!' })

      return next(error)
    })
}

export default getAllbyStation
