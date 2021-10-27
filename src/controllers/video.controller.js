import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import APIFeatures from '../utils/apiFeatures';
import uniqueId from '../utils/uniqueId';
import { uploadObject, deleteObject, deleteDirectory } from '../utils/s3';

import { Video } from '../models/index';

/**
 * @desc      Get All Videos Controller
 * @route     GET /videos/
 * @access    Public
 */
export const getAllPublicVideos = catchAsync(async (req, res, next) => {
  req.query.status = 'public';

  let videos = await APIFeatures(req, Video);

  videos = videos.filter((video) => video.status === 'public');

  if (!videos) {
    return next(new AppError(req.polyglot.t('noVideosFound'), 404));
  }

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulPublicVideosFound'),
    videos
  });
});

/**
 * @desc      Get All Videos Controller
 * @route     GET /videos/private
 * @access    Private
 */
export const getAllPrivateVideos = catchAsync(async (req, res, next) => {
  req.query.status = 'private';
  req.query.userId = req.user.id;

  let videos = await APIFeatures(req, Video);

  if (!videos) {
    return next(new AppError(req.polyglot.t('noVideosFound'), 404));
  }

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulPrivateVideosFound'),
    videos
  });
});
/**
 * @desc      Get Video Controller
 * @route     GET /videos/:id
 * @access    Public
 */
export const getVideo = catchAsync(async (req, res, next) => {
  const { id: videoId } = req.params;

  const video = await Video.findById(videoId).populate([
    { path: 'categoryId', model: 'Category' },
    {
      path: 'userId',
      model: 'User',
      select: 'channelName subscribers profileImageURL'
    },
    { path: 'likes', model: 'Feeling' },
    { path: 'dislikes', model: 'Feeling' },
    { path: 'comments', model: 'Comment' }
  ]);

  if (!video) {
    return next(new AppError(req.polyglot.t('noVideoFound'), 404));
  }

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulVideoFound'),
    video
  });
});

/**
 * @desc      Create New Video Controller
 * @route     POST  /video/
 * @access    Private
 */
export const createVideo = catchAsync(async (req, res, next) => {
  const { title, description, categoryId } = req.body;
  const { id: userId } = req.user;
  const fileId = uniqueId();

  if (!title || !description || !categoryId) {
    return next(new AppError(req.polyglot.t('fieldsRequired'), 400));
  }

  // Get thumbnail object from req.files
  const thumbnail = req.files.filter(
    (file) => file.fieldname === 'thumbnail'
  )[0];
  const thumbnailName = thumbnail.originalname.split(' ').join('-');
  const thumbnailPath = `Users/${userId}/videos/${fileId}/thumbnail-${fileId}-${thumbnailName}`;

  // Get video object from req.files
  const video = req.files.filter((file) => file.fieldname === 'video')[0];
  const videoName = video.originalname.split(' ').join('-');
  const videoPath = `Users/${userId}/videos/${fileId}/video-${fileId}-${videoName}`;

  const [thumbnailResult, videoResult] = await Promise.all([
    await uploadObject(thumbnailPath, thumbnail.buffer),
    await uploadObject(videoPath, video.buffer)
  ]);

  const videoDoc = await Video.create({
    ...req.body,
    thumbnailUrl: thumbnailResult.Location,
    thumbnailKey: thumbnailResult.Key,
    videoUrl: videoResult.Location,
    videoKey: videoResult.Key,
    videoFileId: fileId,
    userId: req.user.id
  });

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulVideoCreate'),
    videoDoc
  });
});

/**
 * @desc      Update Video Details Controller
 * @route     PATCH /videos/:id/details
 * @access    Private
 */
export const updateVideoDetails = catchAsync(async (req, res, next) => {
  const { id: videoId } = req.params;

  let video = await Video.findById(videoId);

  if (!video) {
    return next(new AppError(req.polyglot.t('noVideoFound'), 404));
  }

  const { id: userId } = req.user;

  if (userId !== video.userId) {
    return next(new AppError(req.polyglot.t('notVideoCreator'), 400));
  }

  video = await Video.findByIdAndUpdate(videoId, req.body, {
    new: true,
    runValidators: true
  });

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulVideoDetailsUpdate'),
    video
  });
});

/**
 * @desc      Update Video Thumbnail Controller
 * @route     PATCH /videos/:id/thumbnail
 * @access    Private
 */
export const updateVideoThumbnail = catchAsync(async (req, res, next) => {
  const { id: videoId } = req.params;

  let video = await Video.findById(videoId);

  if (!video) {
    return next(new AppError(req.polyglot.t('noVideoFound'), 404));
  }

  const { id: userId } = req.user;
  const { userId: videoUserId, videoFileId, thumbnailKey } = video;

  if (userId !== videoUserId) {
    return next(new AppError(req.polyglot.t('notVideoCreator'), 400));
  }

  await deleteObject(thumbnailKey);

  const thumbnailName = req.file.originalname.split(' ').join('-');
  const thumbnailPath = `Users/${userId}/videos/${videoFileId}/thumbnail-${videoFileId}-${thumbnailName}`;

  const result = await uploadObject(thumbnailPath, req.file.buffer);

  video = await Video.findByIdAndUpdate(
    videoId,
    {
      thumbnailUrl: result.Location,
      thumbnailKey: result.Key
    },
    {
      new: true,
      runValidators: true
    }
  );

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulVideoThumbnailUpdate'),
    video
  });
});

/**
 * @desc      Delete Video Controller
 * @route     DELETE /videos/:id
 * @access    Private
 */

export const deleteVideo = catchAsync(async (req, res, next) => {
  const { id: videoId } = req.params;

  const video = await Video.findById(videoId);

  if (!video) {
    return next(new AppError(req.polyglot.t('noVideoFound'), 404));
  }

  const { id: userId } = req.user;

  if (userId !== video.userId) {
    return next(new AppError(req.polyglot.t('notVideoCreator'), 400));
  }

  const videoPath = `Users/${userId}/videos/${video.videoFileId}/`;

  await deleteDirectory(videoPath);

  await video.remove();

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulVideoDelete')
  });
});
