import express from 'express';

import protect from '../middlewares/protect';

import { historyController } from '../controllers/index';

const { getHistory, addHistoryItem, deleteHistoryItem, deleteHistory } =
  historyController;

const router = express.Router();

router.use(protect);

router.route('/').get(getHistory).post(addHistoryItem).delete(deleteHistory);
router.route('/:id').delete(deleteHistoryItem);

export default router;
