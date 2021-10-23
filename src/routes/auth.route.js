import express from 'express';

import protect from '../middlewares/protect';

import { authController } from '../controllers/index';

const {
  signup,
  signin,
  logout,
  refreshAuth,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail
} = authController;

const router = express.Router();

router.post('/login', signin);
router.post('/register', signup);
router.post('/logout', logout);
router.post('/tokens', refreshAuth);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-email', verifyEmail);

router.use(protect);

router.post('/send-verification-email', sendVerificationEmail);

export default router;
