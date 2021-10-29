import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import APIFeatures from '../utils/apiFeatures';

import { Subscription } from '../models/index';

/**
 * @desc      Get Subscribed Channels Controller
 * @route     GET /subscription/
 * @access    Private
 */
export const getSubscribedChannels = catchAsync(async (req, res, next) => {
  req.query.subscriberId = req.user.id;

  const channels = await APIFeatures(req, Subscription, 'channelId');

  if (channels.length === 0) {
    return next(new AppError(req.polyglot.t('noSubscribedChannelsFound'), 404));
  }

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulSubscribedChannelsFound'),
    channels
  });
});

/**
 * @desc      Create New Subscription Controller
 * @route     POST /subscription/
 * @access    Private
 */
export const createSubscribe = catchAsync(async (req, res, next) => {
  const { channelId } = req.body;
  const { id: userId } = req.user;

  if (channelId.toString() === userId.toString()) {
    return next(new AppError(req.polyglot.t('ownSubscribe'), 400));
  }

  let subscription = await Subscription.findOne({
    channelId,
    subscriberId: userId
  });

  if (subscription) {
    await subscription.remove();
    return res.status(200).json({ success: true, data: {} });
  }

  subscription = await Subscription.create({
    channelId,
    subscriberId: userId
  });

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulSubscriptionCreate'),
    subscription
  });
});

/**
 * @desc      Check Subscription Controller
 * @route     GET /subscription/:id
 * @access    Private
 */
export const checkSubscription = catchAsync(async (req, res, next) => {
  const { id: channelId } = req.params;
  const { id: userId } = req.user;

  const subscription = await Subscription.findOne({
    channelId,
    subscriberId: userId
  });

  if (!subscription) {
    return next(new AppError(req.polyglot.t('noSubscribedChannelFound'), 404));
  }

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulSubscribedChannelFound'),
    subscription
  });
});

/**
 * @desc      Delete Subscription Controller
 * @route     DELETE /subscription/:id
 * @access    Private
 */
export const deleteSubscribe = catchAsync(async (req, res, next) => {
  const { id: channelId } = req.params;
  const { id: userId } = req.user;

  const channel = await Subscription.findOneAndDelete({
    channelId,
    subscriberId: userId
  });

  if (!channel) {
    return next(new AppError(req.polyglot.t('noChannelFound'), 404));
  }

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulSubscriptionDelete')
  });
});
