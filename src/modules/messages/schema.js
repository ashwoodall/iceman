import mongoose from 'mongoose'
const Schema = mongoose.Schema

const messageSchema = new Schema({
  conversationId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  isRead: {
    type: Boolean,
    required: true
  },
  timestamps: true
})

export default mongoose.model('Message', messageSchema)