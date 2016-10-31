import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  account: {
    email: String,
    password: String,
    isRegistered: Boolean,
  },
  bio: {
    name: {
      first: String,
      last: String
    },
    age: Number,
    hometown: String,
    profilePicture: String, //URL?
    introduction: String,
    hasKids: String, //Y, N, Expecting
    numberOfKids: Number,
    kidsAge: Array,
    hasPets: Boolean,
    aboutPets: String,
    isServiceMember: Boolean,
    soServiceYears: Number
  },
  dutyStations: {
    priorStations: Array, //When other stations are added this could ref the stations document, but it can be strings for now
    currentStation: {
      type: Schema.Types.ObjectId,
      ref: 'Station'
    }
  },
  socialMediaProfiles: {
    facebook: String,
    twitter: String,
    instagram: String,
    pinterest: String
  },
  activities: [{ type: Schema.Types.ObjectId, ref: 'Activity'}]
})

userSchema.methods.generatePassword = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash, (err, match) =>  {
    if (err) throw err
      
    return match
  })
}

export default mongoose.model('User', userSchema)