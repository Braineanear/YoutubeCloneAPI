import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
  {
    text: {
      type: String,
      minlength: [3, 'The text must be more than 3 characters'],
      required: [true, 'Text is required']
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
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

commentSchema.virtual('replies', {
  ref: 'Reply',
  localField: '_id',
  foreignField: 'commentId',
  justOne: false
});

const Comment = mongoose.model('Comment', commentSchema);

/**
 * @typedef Comment
 */

export default Comment;
