import mongoose from 'mongoose'
const Schema = mongoose.Schema

const stationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    city: String,
    state: String,
    country: String
  },
  users: [{ type: Schema.Types.ObjectId, ref: 'User'}]
});

export default mongoose.model('Station', stationSchema)