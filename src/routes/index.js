import express from 'express';

import authRoutes from './auth.route';
import profileRoutes from './profile.route';
import userRoutes from './user.route';
import categoryRoutes from './category.route';
import videoRoutes from './video.route';
import feelingRoutes from './feeling.route';
import commentRoutes from './comment.route';
import subscriptionRoutes from './subscription.route';
import historyRoutes from './history.route';
import replyRoutes from './reply.route';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/videos', videoRoutes);
router.use('/feelings', feelingRoutes);
router.use('/comments', commentRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/histories', historyRoutes);
router.use('/replies', replyRoutes);

export default router;
