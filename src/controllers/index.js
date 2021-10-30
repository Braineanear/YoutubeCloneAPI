import {
  signup,
  signin,
  logout,
  refreshAuth,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail
} from './auth.controller';

import {
  createUser,
  getAllUsers,
  getUser,
  updateUserData,
  uploadProfileImage,
  deleteUser
} from './user.controller';

import {
  getMyData,
  updateMyData,
  changeMyPassword,
  updateMyProfileImage,
  deleteMyAccount
} from './profile.controller';

import {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} from './category.controller';

import {
  getAllPublicVideos,
  getAllPrivateVideos,
  getVideo,
  createVideo,
  updateVideoDetails,
  updateVideoThumbnail,
  deleteVideo
} from './video.controller';

import {
  createFeeling,
  checkFeeling,
  getLikedVideos
} from './feeling.controller';

import {
  getAllComments,
  getCommentsByVideoId,
  createComment,
  updateComment,
  deleteComment
} from './comment.controller';

import {
  getSubscribedChannels,
  checkSubscription,
  createSubscribe,
  deleteSubscribe
} from './subscription.controller';

import {
  getHistory,
  addHistoryItem,
  deleteHistoryItem,
  deleteHistory
} from './history.controller';

const authController = {
  signup,
  signin,
  logout,
  refreshAuth,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail
};

const userController = {
  createUser,
  getAllUsers,
  getUser,
  updateUserData,
  uploadProfileImage,
  deleteUser
};

const profileController = {
  getMyData,
  updateMyData,
  changeMyPassword,
  updateMyProfileImage,
  deleteMyAccount
};

const categoryController = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
};

const videoController = {
  getAllPublicVideos,
  getAllPrivateVideos,
  getVideo,
  createVideo,
  updateVideoDetails,
  updateVideoThumbnail,
  deleteVideo
};

const feelingController = { createFeeling, checkFeeling, getLikedVideos };

const commentController = {
  getAllComments,
  getCommentsByVideoId,
  createComment,
  updateComment,
  deleteComment
};

const subscriptionController = {
  getSubscribedChannels,
  checkSubscription,
  createSubscribe,
  deleteSubscribe
};

const historyController = {
  getHistory,
  addHistoryItem,
  deleteHistoryItem,
  deleteHistory
};

export {
  authController,
  userController,
  profileController,
  categoryController,
  videoController,
  feelingController,
  commentController,
  subscriptionController,
  historyController
};
