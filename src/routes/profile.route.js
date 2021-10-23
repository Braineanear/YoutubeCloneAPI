import express from 'express';
import multer from 'multer';

import protect from '../middlewares/protect';

import { profileController } from '../controllers/index';

const upload = multer({ dest: 'uploads/' });

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
router.route('/image').patch(upload.single('image'), updateMyProfileImage);

export default router;
