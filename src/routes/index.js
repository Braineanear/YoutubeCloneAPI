import express from 'express';

import authRoutes from './auth.route';
import userRoutes from './user.route';
import profileRoutes from './profile.route';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/profile', profileRoutes);

export default router;
