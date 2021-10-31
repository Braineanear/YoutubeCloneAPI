import express from 'express';

import protect from '../middlewares/protect';

import { replyController } from '../controllers/index';

const { getAllReplies, getReply, createReply, updateReply, deleteReply } =
  replyController;

const router = express.Router();

router.route('/').get(getAllReplies);
router.route('/:id').get(getReply);

router.use(protect);

router.route('/').post(createReply);
router.route('/:id').patch(updateReply).delete(deleteReply);

export default router;
