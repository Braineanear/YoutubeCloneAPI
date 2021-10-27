import mongoose from 'mongoose';
import crypto from 'crypto';
import validator from 'validator';
import { hash, verify } from 'argon2';

const userSchema = mongoose.Schema(
  {
    channelName: {
      type: String,
      required: [true, 'Please add a channel name'],
      unique: true,
      uniqueCaseInsensitive: true
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      lowercase: true,
      trim: true,
      uniqueCaseInsensitive: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      }
    },
    profileImageURL: {
      type: String,
      default:
        'https://youtube-clone--api.s3.eu-central-1.amazonaws.com/Users/default-user.png'
    },
    profileImageKey: {
      type: String,
      default: 'Users/default-user.png'
    },
    role: {
      type: 'String',
      enum: ['user', 'admin'],
      default: 'user'
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            'Password must contain at least one letter and one number'
          );
        }
      },
      select: false
    },
    passwordConfirmation: {
      type: String,
      required: true,
      validate: {
        // This only works with CREATE & SAVE!!!!!
        validator: function (el) {
          return el === this.password;
        },
        messege: 'Passwords are not the same'
      },
      select: false
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    passwordChangedAt: Date
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

userSchema.index({ channelName: 'text' }, { unique: true });

userSchema.virtual('subscribers', {
  ref: 'Subscription',
  localField: '_id',
  foreignField: 'channelId',
  justOne: false,
  count: true
});

userSchema.virtual('videos', {
  ref: 'Video',
  localField: '_id',
  foreignField: 'userId',
  justOne: false,
  count: true
});

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  return await verify(this.password, password);
};

// Encrypt Password Using Argon2
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = crypto.randomBytes(32);
  this.password = await hash(this.password, { salt });

  this.passwordConfirmation = undefined;
  next();
});

// Set passwordChangedAt field to the current time when the user change the password
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Check if user changed password after the token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

export default User;
