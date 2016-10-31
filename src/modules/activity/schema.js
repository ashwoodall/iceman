import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  description: String,
  users: [{ type: Schema.Types.ObjectId, ref: 'User'}] //Not sure if needed. Could be useful for getting users by activity
})

export default mongoose.model('Activity', activitySchema)