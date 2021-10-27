import express from 'express';

import protect from '../middlewares/protect';

import { multipleFiles, singleImage } from '../utils/multer';

import { videoController } from '../controllers/index';

const {
  getAllPublicVideos,
  getAllPrivateVideos,
  getVideo,
  createVideo,
  updateVideoDetails,
  updateVideoThumbnail,
  deleteVideo
} = videoController;

const router = express.Router();

router.route('/private').get(protect, getAllPrivateVideos);

router.route('/').get(getAllPublicVideos);
router.route('/:id').get(getVideo);

router.use(protect);

router.route('/').post(multipleFiles(), createVideo);
router.route('/:id/details').patch(updateVideoDetails);
router
  .route('/:id/thumbnail')
  .patch(singleImage('thumbnail'), updateVideoThumbnail);
router.route('/:id').delete(deleteVideo);

export default router;
