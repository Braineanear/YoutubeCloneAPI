import express from 'express';

import protect from '../middlewares/protect';

import { feelingController } from '../controllers/index';

const { createFeeling, checkFeeling, getLikedVideos } = feelingController;

const router = express.Router();

router.use(protect);

router.route('/').post(createFeeling);
router.route('/check/:id').get(checkFeeling);
router.route('/videos').get(getLikedVideos);

export default router;
