import mongoose from 'mongoose';

const historySchema = mongoose.Schema(
  {
    searchText: {
      type: String
    },
    type: {
      type: String,
      enum: ['watch', 'search'],
      required: [true, 'Type is required']
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    videoId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Video'
    }
  },
  { timestamps: true }
);

const History = mongoose.model('History', historySchema);

/**
 * @typedef History
 */

export default History;
