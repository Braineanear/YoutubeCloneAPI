import express from 'express';

import protect from '../middlewares/protect';

import { subscriptionController } from '../controllers/index';

const {
  getSubscribedChannels,
  checkSubscription,
  createSubscribe,
  deleteSubscribe
} = subscriptionController;

const router = express.Router();

router.use(protect);

router.route('/').get(getSubscribedChannels).post(createSubscribe);
router.route('/:id').get(checkSubscription).delete(deleteSubscribe);

export default router;
