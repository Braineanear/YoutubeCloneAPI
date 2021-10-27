import express from 'express';

import { singleImage } from '../utils/multer';

import protect from '../middlewares/protect';

import { profileController } from '../controllers/index';

const {
  getMyData,
  updateMyData,
  changeMyPassword,
  updateMyProfileImage,
  deleteMyAccount
} = profileController;

const router = express.Router();

router.use(protect);

router.route('/').get(getMyData).patch(updateMyData).delete(deleteMyAccount);
router.route('/change-password').patch(changeMyPassword);
router.route('/image').patch(singleImage('image'), updateMyProfileImage);

export default router;
