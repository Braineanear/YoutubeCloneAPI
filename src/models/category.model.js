import mongoose from 'mongoose';

const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      minlength: [3, 'Title must be more than three characters'],
      trim: true,
      unique: true,
      uniqueCaseInsensitive: true,
      required: [true, 'Title is required']
    },
    description: {
      type: String,
      minlength: [3, 'Description must be more than three characters'],
      required: [true, 'Description is required']
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
 * @typedef Category
 */
const Category = mongoose.model('Category', categorySchema);

export default Category;
