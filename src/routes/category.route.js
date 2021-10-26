import express from 'express';

import protect from '../middlewares/protect';
import restrictedTo from '../middlewares/restrictedTo';

import { categoryController } from '../controllers/index';

const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = categoryController;

const router = express.Router();

router.route('/').get(getAllCategories);
router.route('/:id').get(getCategory);

router.use(protect);
router.use(restrictedTo('admin'));

router.route('/').post(createCategory);
router.route('/:id').patch(updateCategory).delete(deleteCategory);

export default router;
