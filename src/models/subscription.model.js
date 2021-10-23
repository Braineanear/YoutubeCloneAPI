import mongoose from 'mongoose';

const subscriptionSchema = mongoose.Schema(
  {
    subscriberId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    channelId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

const Subscription = mongoose.model('Subscription', subscriptionSchema);

/**
 * @typedef Subscription
 */
export default Subscription;
