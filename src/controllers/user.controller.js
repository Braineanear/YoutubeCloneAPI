import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import APIFeatures from '../utils/apiFeatures';
import { uploadObject, deleteObject } from '../utils/s3';

import { User } from '../models/index';

/**
 * @desc      Create New User Controller
 * @route     POST /users/
 * @access    Private
 */
export const createUser = catchAsync(async (req, res, next) => {
  const { channelName, email, password, passwordConfirmation, role } = req.body;

  if (!channelName || !email || !password || !passwordConfirmation || !role) {
    return next(new AppError(req.polyglot.t('fieldsRequired'), 400));
  }

  const isEmailTaken = await User.isEmailTaken(email);

  if (isEmailTaken) {
    return next(new AppError(req.polyglot.t('emailTaken'), 409));
  }

  const user = await User.create({
    channelName,
    email,
    password,
    passwordConfirmation,
    role,
    isEmailVerified: true
  });

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulAccountCreate'),
    user
  });
});

/**
 * @desc      Get All Users Controller
 * @route     GET /users/
 * @access    Public
 */
export const getAllUsers = catchAsync(async (req, res, next) => {
  let { page, sort, limit, select } = req.query;

  if (!page) page = 1;
  if (!sort) sort = '';
  if (!limit) limit = 10;
  if (!select) select = '';

  const populateOptions = [
    {
      path: 'videos'
    },
    {
      path: 'subscribers'
    }
  ];

  const users = await APIFeatures(req, User, populateOptions);

  if (users.length === 0) {
    return next(new AppError(req.polyglot.t('noUsersFound'), 404));
  }

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulUsersFound'),
    users
  });
});

/**
 * @desc      Get User Data Using It's ID Controller
 * @route     GET /users/:id
 * @access    Public
 */
export const getUser = catchAsync(async (req, res, next) => {
  const { id: userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError(req.polyglot.t('noUserFound'), 404));
  }

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulUserFound'),
    user
  });
});

/**
 * @desc      Update User Details Controller
 * @route     PATCH /users/:id
 * @access    Private
 */
export const updateUserData = catchAsync(async (req, res, next) => {
  const { id: userId } = req.params;

  let user = await User.findById(userId);

  if (!user) {
    return next(new AppError(req.polyglot.t('noUserFound'), 404));
  }

  const { email } = req.body;

  if (email) {
    const isEmailTaken = await User.isEmailTaken(email, userId);

    if (isEmailTaken) {
      return next(new AppError(req.polyglot.t('emailTaken'), 409));
    }
  }

  user = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
    runValidators: true
  });

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulDataUpdate'),
    user
  });
});

/**
 * @desc      Upload Profile Image Controller
 * @route     PATCH /users/:id/profile-image
 * @access    Private
 */
export const uploadProfileImage = catchAsync(async (req, res, next) => {
  const { id: userId } = req.params;

  let user = await User.findById(userId);

  if (!user) {
    return next(new AppError(req.polyglot.t('noUserFound'), 404));
  }

  const result = await uploadObject(req, userId);

  await deleteObject(user.profileImageKey);

  user = await User.findByIdAndUpdate(
    userId,
    {
      profileImageURL: result.Location,
      profileImageKey: result.Key
    },
    {
      new: true,
      runValidators: true
    }
  );

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulProfileImage'),
    user
  });
});

/**
 * @desc      Delete User's Data Controller
 * @route     DELETE /users/:id
 * @access    Private
 */

export const deleteUser = catchAsync(async (req, res, next) => {
  const { id: userId } = req.params;

  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    return next(new AppError(req.polyglot.t('noUserFound'), 404));
  }

  await deleteObject(user.profileImageKey);

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulAccountDelete')
  });
});
