import mongoose from 'mongoose'
const Schema = mongoose.Schema

const referenceSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  body: {
    type: String, required: true
  },
  isDeleted: Boolean,
  isPublished: Boolean,
  timestamps: true
})

export default mongoose.model('Reference', referenceSchema)