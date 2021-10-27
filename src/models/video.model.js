import mongoose from 'mongoose';

const videoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      minlength: [3, 'Title must be more than 3 characters'],
      required: [true, 'Title is required']
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    thumbnailUrl: {
      type: String,
      default: ''
    },
    thumbnailKey: {
      type: String,
      default: ''
    },
    views: {
      type: Number,
      default: 0
    },
    videoUrl: {
      type: String,
      required: true
    },
    videoKey: {
      type: String,
      required: true
    },
    videoFileId: {
      type: String,
      requred: true
    },
    status: {
      type: String,
      enum: ['draft', 'private', 'public'],
      default: 'draft'
    },
    categoryId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
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

videoSchema.index({ title: 'text' });

videoSchema.virtual('dislikes', {
  ref: 'Feeling',
  localField: '_id',
  foreignField: 'videoId',
  justOne: false,
  count: true,
  match: { type: 'dislike' }
});

videoSchema.virtual('likes', {
  ref: 'Feeling',
  localField: '_id',
  foreignField: 'videoId',
  justOne: false,
  count: true,
  match: { type: 'like' }
});

videoSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'videoId',
  justOne: false,
  count: true
});

const Video = mongoose.model('Video', videoSchema);

/**
 * @typedef Video
 */

export default Video;
