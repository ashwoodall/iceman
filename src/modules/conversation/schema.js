import mongoose from 'mongoose'
const Schema = mongoose.Schema

const conversationSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User'}]
})

module.exports = mongoose.model('Conversation', conversationSchema)