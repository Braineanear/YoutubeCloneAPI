import mongoose from 'mongoose';

const replySchema = mongoose.Schema(
  {
    text: {
      type: String,
      minlength: [3, 'The text must be more than 3 characters'],
      required: [true, 'Text is required']
    },
    commentId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment',
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

replySchema.pre('find', function () {
  this.populate({
    path: 'userId',
    select: 'channelName profileImageURL',
    sort: '+createdAt'
  });
});

const Reply = mongoose.model('Reply', replySchema);

/**
 * @typedef Reply
 */

export default Reply;
