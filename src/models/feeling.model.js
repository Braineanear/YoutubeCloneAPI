import mongoose from 'mongoose';

const feelingSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['like', 'dislike'],
      required: [true, 'Type is required either like or dislike']
    },
    videoId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Video',
      required: true
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

/**
 * @typedef Feeling
 */

const Feeling = mongoose.model('Feeling', feelingSchema);

export default Feeling;
