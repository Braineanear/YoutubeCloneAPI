import express from 'express';
import multer from 'multer';

import protect from '../middlewares/protect';
import restrictedTo from '../middlewares/restrictedTo';

import { userController } from '../controllers/index';

const upload = multer({ dest: 'uploads/' });

const {
  createUser,
  getAllUsers,
  getUser,
  updateUserData,
  uploadProfileImage,
  deleteUser
} = userController;

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser);

router.use(protect);
router.use(restrictedTo('admin'));

router.route('/').post(createUser);
router.route('/:id').patch(updateUserData).delete(deleteUser);
router
  .route('/:id/profile-image')
  .patch(upload.single('image'), uploadProfileImage);

export default router;
