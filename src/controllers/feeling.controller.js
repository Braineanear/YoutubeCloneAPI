import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import { generateCacheKey, setValue, getValue } from '../utils/redis';

import { Feeling, Video } from '../models/index';

/**
 * @desc      Get Create New Feeling (Like/Dislike) Controller
 * @route     POST /feelings/
 * @access    Private
 */
export const createFeeling = catchAsync(async (req, res, next) => {
  const { type, videoId } = req.body;
  const { id: userId } = req.user;

  const video = await Video.findById(videoId);

  if (!video) {
    return next(new AppError(req.polyglot.t('noVideoFound'), 404));
  }

  if (video.status !== 'public') {
    return next(new AppError(req.polyglot.t('notPublicVideo'), 400));
  }

  if (video.userId.toString() === userId.toString()) {
    return next(new AppError(req.polyglot.t('sameVideoCreator'), 400));
  }

  let feeling = await Feeling.findOne({ videoId, userId });

  if (!feeling) {
    feeling = await Feeling.create({ type, videoId, userId });

    return res.status(201).json({
      status: 'success',
      message: req.polyglot.t('successfulFeelingCreate'),
      feeling
    });
  }

  if (type === feeling.type) {
    await feeling.remove();

    return res.status(200).json({
      status: 'success',
      message: req.polyglot.t('successfulFeelingRemove')
    });
  }

  feeling.type = type;

  await feeling.save();

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulFeelingTrigger')
  });
});

/**
 * @desc      Check Feelings on Video Controller
 * @route     GET /feelings/check/:id
 * @access    Private
 */
export const checkFeeling = catchAsync(async (req, res, next) => {
  const { id: videoId } = req.params;
  const { id: userId } = req.user;

  const feeling = await Feeling.findOne({ videoId, userId });

  if (!feeling) {
    return next(new AppError(req.polyglot.t('noFeelingFound'), 404));
  }

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulFeelingFound'),
    feeling
  });
});

/**
 * @desc      Get All Liked Videos Controller
 * @route     GET /feelings/videos
 * @access    Private
 */
export const getLikedVideos = catchAsync(async (req, res, next) => {
  const { id: userId } = req.user;

  let { page, sort, limit, select } = req.query;

  if (!page) page = 1;
  if (!sort) sort = '';
  if (!limit) limit = 10;
  if (!select) select = '';

  const key = generateCacheKey(
    'likedVideos',
    `page:${page}-sortBy:${sort}-limit:${limit}-select:${select}`
  );

  let cached = await getValue(key);

  cached = JSON.parse(cached);

  if (cached) {
    return res.status(200).json({
      status: 'success',
      message: req.polyglot.t('successfulLikedVideosFound'),
      likes: cached
    });
  }

  const likes = await Feeling.find({ type: 'like', userId }).populate([
    {
      path: 'videoId'
    },
    {
      path: 'userId',
      select: 'channelName profileImageURL'
    }
  ]);

  if (likes.length === 0) {
    return next(new AppError(req.polyglot.t('noFeelingsFound'), 404));
  }

  setValue(key, JSON.stringify(likes), 60);

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulLikedVideosFound'),
    likes
  });
});
