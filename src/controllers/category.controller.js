import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import APIFeatures from '../utils/apiFeatures';

import { Category } from '../models/index';

/**
 * @desc      Get All Categories Controller
 * @route     GET /categories/
 * @access    Public
 */
export const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await APIFeatures(req, Category);

  if (!categories) {
    return next(new AppError(req.polyglot.t('noCategoriesFound'), 404));
  }

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulCategoriesFound'),
    categories
  });
});

/**
 * @desc      Get Category Controller
 * @route     GET /categories/:id
 * @access    Public
 */
export const getCategory = catchAsync(async (req, res, next) => {
  const { id: categoryId } = req.params;

  const category = await Category.findById(categoryId);

  if (!category) {
    return next(new AppError(req.polyglot.t('noCategoryFound'), 404));
  }

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulCategoryFound'),
    category
  });
});

/**
 * @desc      Create New Category Controller
 * @route     POST  /categories/
 * @access    Private
 */
export const createCategory = catchAsync(async (req, res, next) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return next(new AppError(req.polyglot.t('fieldsRequired'), 400));
  }

  const category = await Category.create({
    ...req.body,
    userId: req.user.id
  });

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulCategoryCreate'),
    category
  });
});

/**
 * @desc      Update Category Controller
 * @route     PATCH /categories/:id
 * @access    Private
 */
export const updateCategory = catchAsync(async (req, res, next) => {
  const { id: categoryId } = req.params;

  const category = await Category.findByIdAndUpdate(categoryId, req.body, {
    new: true,
    runValidators: true
  });

  if (!category) {
    return next(new AppError(req.polyglot.t('noCategoryFound'), 404));
  }

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulCategoryUpdate'),
    category
  });
});

/**
 * @desc      Delete Category Controller
 * @route     DELETE /categories/:id
 * @access    Private
 */

export const deleteCategory = catchAsync(async (req, res, next) => {
  const { id: categoryId } = req.params;

  const category = await Category.findByIdAndDelete(categoryId);

  if (!category) {
    return next(new AppError(req.polyglot.t('noCategoryFound'), 404));
  }

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulCategoryDelete')
  });
});
