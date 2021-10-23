import tokenTypes from '../config/tokens';

import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import {
  sendVerificationMessage,
  sendAfterResetPasswordMessage,
  sendResetPasswordMessage
} from '../utils/sendEmail';

import {
  verifyToken,
  generateAuthTokens,
  generateVerifyEmailToken,
  generateResetPasswordToken
} from '../middlewares/token';

import { User, Token } from '../models/index';

/**
 * @desc      Sign Up Controller
 * @route     POST  /auth/signup
 * @access    Public
 */
export const signup = catchAsync(async (req, res, next) => {
  const { channelName, email, password, passwordConfirmation, role } = req.body;

  if (!channelName || !email || !password || !passwordConfirmation || !role) {
    return next(new AppError(req.polyglot.t('fieldsRequired'), 400));
  }

  if (password.length < 8) {
    return next(new AppError(req.polyglot.t('passwordLength'), 400));
  }

  if (!['user'].includes(role)) {
    return next(new AppError(req.polyglot.t('roleRestriction'), 400));
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
    role
  });

  const tokens = await generateAuthTokens(user.id);

  const verifyEmailToken = await generateVerifyEmailToken(user.id);

  await sendVerificationMessage(email, verifyEmailToken);

  user.password = undefined;

  return res.status(201).json({
    status: 'success',
    message: req.polyglot.t('successfulSignUp'),
    user,
    tokens
  });
});

/**
 * @desc      Sign In Controller
 * @route     POST  /auth/signin
 * @access    Public
 */
export const signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError(req.polyglot.t('emailPasswordRequired'), 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new AppError(req.polyglot.t('incorrectEmailOrPassword'), 401));
  }

  const isMatch = await user.isPasswordMatch(password);

  if (!isMatch) {
    return next(new AppError(req.polyglot.t('incorrectEmailOrPassword'), 401));
  }

  const tokens = await generateAuthTokens(user.id);

  user.password = undefined;

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulLogin'),
    user,
    tokens
  });
});

/**
 * @desc      Logout Controller
 * @route     POST  /auth/logout
 * @access    Private
 */
export const logout = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.body;

  const refreshTokenDoc = await Token.findOneAndDelete({
    token: refreshToken,
    type: tokenTypes.REFRESH
  });

  if (!refreshTokenDoc) {
    return next(new AppError(req.polyglot.t('loginAgain'), 401));
  }

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulogout')
  });
});

/**
 * @desc      Generate Refresh Token Controller
 * @route     POST  /auth/refreshToken
 * @access    Public
 */
export const refreshAuth = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.body;

  const refreshTokenDoc = await verifyToken(refreshToken, tokenTypes.REFRESH);

  if (!refreshTokenDoc) {
    return next(new AppError(req.polyglot.t('noTokenFound'), 404));
  }

  const user = await User.findById(refreshTokenDoc.user);

  if (!user) {
    return next(new AppError(req.polyglot.t('noUserFound'), 404));
  }

  const tokens = await generateAuthTokens(user.id);

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulTokenGeneration'),
    tokens
  });
});

/**
 * @desc      Forgot Password Controller
 * @route     POST  /auth/forgotPassword
 * @access    Public
 */
export const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError(req.polyglot.t('noUserFound'), 404));
  }

  const resetPasswordToken = await generateResetPasswordToken(user.id);

  await sendResetPasswordMessage(email, resetPasswordToken);

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulResetLink')
  });
});

/**
 * @desc      Reset Password Controller
 * @route     POST  /auth/resetPassword
 * @access    Public
 */
export const resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.query;
  const { password, passwordConfirmation } = req.body;

  if (password !== passwordConfirmation) {
    return next(new AppError(req.polyglot.t('passConfirm'), 401));
  }

  const resetPasswordTokenDoc = await verifyToken(
    token,
    tokenTypes.RESET_PASSWORD
  );

  if (!resetPasswordTokenDoc) {
    return next(new AppError(req.polyglot.t('invalidLink'), 400));
  }

  const user = await User.findById(resetPasswordTokenDoc.user);

  if (!user) {
    return next(new AppError(req.polyglot.t('noUserFound'), 404));
  }

  user.password = password;

  await user.save();

  await sendAfterResetPasswordMessage(user.email);

  await Token.findByIdAndDelete(user.id, {
    type: tokenTypes.RESET_PASSWORD
  });

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulPasswordChange')
  });
});

/**
 * @desc      Send Verification Email Controller
 * @route     POST  /auth/sendVerificationEmail
 * @access    Private
 */
export const sendVerificationEmail = catchAsync(async (req, res, next) => {
  const { user } = req;

  if (user.isEmailVerified) {
    return next(new AppError(req.polyglot.t('emailVerified'), 400));
  }

  const verifyEmailToken = await generateVerifyEmailToken(user.id);

  await sendVerificationMessage(user.email, verifyEmailToken);

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulSendVerificationEmail')
  });
});

/**
 * @desc      Verify Email Controller
 * @route     POST  /auth/verifyEmail
 * @access    Public
 */
export const verifyEmail = catchAsync(async (req, res, next) => {
  const { token: verifyEmailToken } = req.query;

  const verifyEmailTokenDoc = await verifyToken(
    verifyEmailToken,
    tokenTypes.VERIFY_EMAIL
  );

  const user = await User.findById(verifyEmailTokenDoc.user);

  if (!user) {
    return next(new AppError(req.polyglot.t('noUserFound'), 404));
  }

  await Token.findByIdAndDelete(user.id, { type: tokenTypes.VERIFY_EMAIL });

  await User.findByIdAndUpdate(user.id, { isEmailVerified: true });

  return res.status(200).json({
    status: 'success',
    message: req.polyglot.t('successfulEmailVerification')
  });
});
