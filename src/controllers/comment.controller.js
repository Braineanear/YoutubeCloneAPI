import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import APIFeatures from '../utils/apiFeatures';

import { Comment, Video } from '../models/index';

/**
 * @desc      Get All Comments Controller
 * @route     GET /comments/
 * @access    Public
 */
export const getAllComments = catchAsync(async (req, res, next) => {
  const populateOptions = { path: 'replies' };

  const comments = await APIFeatures(req, Comment, populateOptions);

  if (comments.length === 0) {
    return next(new AppError(req.polyglot.t('noCommentsFound'), 404));
  }

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulCommentsFound'),
    comments
  });
});

/**
 * @desc      Get All Comments By Video Id Controller
 * @route     GET /comments/:id
 * @access    Public
 */
export const getCommentsByVideoId = catchAsync(async (req, res, next) => {
  const { id: videoId } = req.params;
  const populateOptions = [
    {
      path: 'userId'
    },
    {
      path: 'replies'
    }
  ];

  const comments = await Comment.find({ videoId }).populate(populateOptions);

  if (!comments) {
    return next(new AppError(req.polyglot.t('noCommentsFound'), 404));
  }

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulCommentsFound'),
    comments
  });
});

/**
 * @desc      Create New Comment Controller
 * @route     POST /comments/
 * @access    Private
 */
export const createComment = catchAsync(async (req, res, next) => {
  const { videoId } = req.body;
  const { id: userId } = req.user;

  const video = await Video.findOne({
    _id: videoId,
    status: 'public'
  });

  if (!video) {
    return next(new AppError(req.polyglot.t('noVideoFound'), 404));
  }

  const comment = await Comment.create({
    ...req.body,
    userId
  });

  return res.status(201).json({
    status: 'success',
    message: req.polyglot.t('successfulCommentCreate'),
    comment
  });
});

/**
 * @desc      Update Comment Controller
 * @route     PATCH /comments/:id
 * @access    Private
 */
export const updateComment = catchAsync(async (req, res, next) => {
  const { id: commentId } = req.params;
  const { id: userId } = req.user;

  let comment = await Comment.findById(commentId).populate('videoId');

  if (!comment) {
    return next(new AppError(req.polyglot.t('noCommentFound'), 404));
  }

  if (
    comment.userId.toString() === userId.toString() ||
    comment.videoId.userId.toString() === userId.toString()
  ) {
    comment = await Comment.findByIdAndUpdate(commentId, req.body, {
      new: true,
      runValidators: true
    });

    return res.status(200).json({
      status: 'success',
      message: req.polyglot.t('successfulCommentUpdate'),
      comment
    });
  }
  return next(new AppError(req.polyglot.t('notAuthorized'), 400));
});

/**
 * @desc      Delete Comment Controller
 * @route     DELETE /comments/:id
 * @access    Private
 */
export const deleteComment = catchAsync(async (req, res, next) => {
  const { id: commentId } = req.params;
  const { id: userId } = req.user;

  let comment = await Comment.findById(commentId).populate('videoId');

  if (!comment) {
    return next(new AppError(req.polyglot.t('noCommentFound'), 404));
  }

  if (
    comment.userId.toString() === userId.toString() ||
    comment.videoId.userId.toString() === userId.toString()
  ) {
    await comment.remove();

    return res.status(200).json({
      status: 'success',
      message: req.polyglot.t('successfulCommentDelete')
    });
  }
  return next(new AppError(req.polyglot.t('notAuthorized'), 400));
});
