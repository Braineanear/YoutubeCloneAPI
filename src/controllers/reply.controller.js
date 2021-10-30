import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import APIFeatures from '../utils/apiFeatures';

import { Reply, Comment } from '../models/index';

/**
 * @desc      Get All Replies Controller
 * @route     GET /replies/
 * @access    Public
 */
export const getAllReplies = catchAsync(async (req, res, next) => {
  const replies = await APIFeatures(req, Reply);

  if (replies.length === 0) {
    return next(new AppError(req.polyglot.t('noRepliesFound'), 404));
  }

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulRepliesFound'),
    replies
  });
});

/**
 * @desc      Get Reply Controller
 * @route     GET /replies/:id
 * @access    Public
 */
export const getReply = catchAsync(async (req, res, next) => {
  const { id: replyId } = req.params;

  const reply = await Reply.findById(replyId);

  if (!reply) {
    return next(new AppError(req.polyglot.t('noReplyFound'), 404));
  }

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulReplyFound'),
    reply
  });
});

/**
 * @desc      Create Reply Controller
 * @route     POST /replies/
 * @access    Private
 */
export const createReply = catchAsync(async (req, res, next) => {
  const { commentId } = req.body;
  const { id: userId } = req.user;

  const comment = await Comment.findOne({ _id: commentId });

  if (!comment) {
    return next(new AppError(req.polyglot.t('noCommentFound'), 404));
  }

  const reply = await Reply.create({
    ...req.body,
    userId
  });

  return res.status(201).json({
    status: 'success',
    message: req.polyglot.t('successfulReplyCreate'),
    reply
  });
});

/**
 * @desc      Update Reply Controller
 * @route     PATCH /replies/:id
 * @access    Private
 */
export const updateReply = catchAsync(async (req, res, next) => {
  const { id: replyId } = req.params;
  const { id: userId } = req.user;

  let reply = await Reply.findById(replyId).populate({
    path: 'commentId',
    select: 'userId videoId',
    populate: {
      path: 'videoId',
      select: 'userId'
    }
  });

  if (!reply) {
    return next(new AppError(req.polyglot.t('noReplyFound'), 404));
  }

  if (
    reply.userId.toString() === userId.toString() ||
    reply.commentId.videoId.userId.toString() === userId.toString()
  ) {
    reply = await Reply.findByIdAndUpdate(replyId, req.body, {
      new: true,
      runValidators: true
    });

    return res.status(200).json({
      status: 'success',
      message: req.polyglot.t('successfulReplyUpdate'),
      reply
    });
  }
  return next(new AppError(req.polyglot.t('notAuthorized'), 400));
});

/**
 * @desc      Delete Reply Controller
 * @route     DELETE /replies/:id
 * @access    Private
 */
export const deleteReply = catchAsync(async (req, res, next) => {
  const { id: replyId } = req.params;
  const { id: userId } = req.user;

  const reply = await Reply.findById(replyId).populate({
    path: 'commentId',
    select: 'userId videoId',
    populate: {
      path: 'videoId',
      select: 'userId'
    }
  });

  if (!reply) {
    return next(new AppError(req.polyglot.t('noReplyFound'), 404));
  }

  if (
    reply.userId.toString() === userId.toString() ||
    reply.commentId.videoId.userId.toString() === userId.toString()
  ) {
    await reply.remove();

    return res.status(200).json({
      status: 'success',
      message: req.polyglot.t('successfulReplyDelete'),
      reply
    });
  }
  return next(new AppError(req.polyglot.t('notAuthorized'), 400));
});
