import express from 'express';

import protect from '../middlewares/protect';

import { commentController } from '../controllers/index';

const {
  getAllComments,
  getCommentsByVideoId,
  createComment,
  updateComment,
  deleteComment
} = commentController;

const router = express.Router();

router.route('/').get(getAllComments);
router.route('/:id').get(getCommentsByVideoId);

router.use(protect);

router.post('/').post(createComment);
router.patch('/:id').patch(updateComment).delete(deleteComment);

export default router;
