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

export { authController, userController, profileController };
