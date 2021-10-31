import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import APIFeatures from '../utils/apiFeatures';
import { generateCacheKey, setValue, getValue } from '../utils/redis';

import { History, Video } from '../models/index';

/**
 * @desc      Get History Data Controller
 * @route     GET /histories
 * @access    Private
 */
export const getHistory = catchAsync(async (req, res, next) => {
  let { page, sort, limit, select } = req.query;

  if (!page) page = 1;
  if (!sort) sort = '';
  if (!limit) limit = 10;
  if (!select) select = '';

  const key = generateCacheKey(
    'history',
    `page:${page}-sortBy:${sort}-limit:${limit}-select:${select}`
  );

  let cached = await getValue(key);

  cached = JSON.parse(cached);

  if (cached) {
    return res.status(200).json({
      status: 'success',
      message: req.polyglot.t('successfulHistoryFound'),
      history: cached
    });
  }

  const history = await APIFeatures(req, History);

  if (history.length === 0) {
    return next(new AppError(req.polyglot.t('noHistoryFound'), 404));
  }

  setValue(key, JSON.stringify(history), 60);

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulHistoryFound'),
    history
  });
});

/**
 * @desc      Ad History Item Controller
 * @route     POST /histories
 * @access    Private
 */
export const addHistoryItem = catchAsync(async (req, res, next) => {
  const { type, videoId } = req.body;
  const { id: userId } = req.user;

  if (type === 'watch') {
    const video = await Video.findById(videoId);

    if (!video) {
      return next(new AppError(req.polyglot.t('noVideoFound'), 404));
    }
  }

  const history = await History.create({
    ...req.body,
    userId
  });

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfuladdHistoryItem'),
    history
  });
});

/**
 * @desc      Delete History Item Controller
 * @route     DELETE /histories/:id
 * @access    Private
 */
export const deleteHistoryItem = catchAsync(async (req, res, next) => {
  const { id: itemId } = req.params;
  const { id: userId } = req.user;

  const history = await History.findOneAndDelete({
    id: itemId,
    userId
  });

  if (!history) {
    return next(new AppError(req.polyglot.t('noHistroyFound'), 404));
  }

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulHistoryItemDelete')
  });
});

/**
 * @desc      Delete History Controller
 * @route     DELETE /histories
 * @access    Private
 */
export const deleteHistory = catchAsync(async (req, res, next) => {
  const { id: userId } = req.user;

  await History.deleteMany({ userId });

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulHistoryDelete')
  });
});
