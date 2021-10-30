export const availableLangs = ['ar', 'en'];

export const messages = {
  en: {
    fieldsRequired: 'All fields are required.',
    passwordLength:
      'Password must be longer than 8 characters and contains letters, numbers, and symbols.',
    roleRestriction: 'Role must be one of the following: user',
    emailTaken: 'Email is already taken, plaease enter another email.',
    emailPasswordRequired: 'Please enter both email and password!',
    passwordUpdateRoute:
      'Cannot update password from here, please go to update password route.',
    incorrectEmailOrPassword: 'Incorrect email or password.',
    passConfirm: 'Password and passwordConfirmation must be the same.',
    invalidLink: 'Invalid link or expired',
    notSamePassword:
      'This is not your password. Please enter the correct current password.',
    loginAgain: 'Please login again!',
    noTokenFound: 'No token found.',
    noUserFound: 'No user found.',
    emailVerified: 'Email is already verified.',
    notAuthorized: 'You are not authorized to perform this action.',
    notPublicVideo: "You can't like/dislike this video until it's made public.",
    noCategoriesFound: 'No categories found.',
    noCommentsFound: 'No comments found.',
    noCommentFound: 'No comment found',
    sameVideoCreator: "Sorry you can't make react on your video.",
    noVideoFound: 'No video found.',
    noFeelingFound: 'No feeling found.',
    noFeelingsFound: 'No feelings found.',
    noHistoryFound: 'No history found.',
    noRepliesFound: 'No replies found.',
    noReplyFound: 'No reply found',
    noSubscribedChannelsFound: 'No subscribed channels found.',
    noSubscribedChannelFound: 'No subscribed channel found.',
    ownSubscribe: "You can't subscribe yourself.",
    noUsersFound: 'No users found.',
    noChannelFound: 'No channel found.',
    noVideosFound: 'No videos found.',
    notVideoCreator: 'You are not the video creator.',
    successfulSignUp: 'Account created successful, please verify your email!',
    successfulLogin: 'User logged in successfuly.',
    successfulLogout: 'Logged out successfuly.',
    successfulTokenGeneration: 'Tokens generated successfully.',
    successfulResetLink: 'Reset password link sent successfully.',
    successfulPasswordChange: 'Password changed successfully.',
    successfulSendVerificationEmail: 'Verification email sent successfully.',
    successfulEmailVerification: 'Email verified successfully.',
    successfulCategoriesFound: 'Found categories successfully.',
    successfulCategoryFound: 'Category found successfully.',
    successfulCategoryCreate: 'Category created successfully.',
    successfulCategoryUpdate: 'Category updated successfully.',
    successfulCategoryDelete: 'Category deleted successfully.',
    successfulCommentsFound: 'Found comments successfully.',
    successfulCommentCreate: 'Comment created successfully.',
    successfulCommentUpdate: 'Comment updated successfully',
    successfulCommentDelete: 'Comment deleted successfully.',
    successfulFeelingCreate: 'Feeling created successfully.',
    successfulFeelingRemove: 'Feeling deleted successfully.',
    successfulFeelingTrigger: 'Feeling triggred successfully.',
    successfulFeelingFound: 'Found feeling successfully.',
    successfulLikedVideosFound: 'Found like videos successfully.',
    successfulHistoryFound: 'History successfully found.',
    successfuladdHistoryItem: 'History item added successfully.',
    successfulHistoryItemDelete: 'History item deleted successfully.',
    successfulHistoryDelete: 'History deleted successfully.',
    successfulProfileDataFound: 'Profile data successfully found.',
    successfulDataUpdate: 'Profile data updated successfully.',
    successfulProfileImage: 'Profile image updated successfully.',
    successfulProfileDelete: 'Profile data deleted successfully.',
    successfulRepliesFound: 'Found replies successfully.',
    successfulReplyFound: 'Found reply successfully.',
    successfulReplyCreate: 'Reply created successfully.',
    successfulReplyUpdate: 'Reply updated successfully.',
    successfulReplyDelete: 'Reply deleted successfully.',
    successfulSubscribedChannelsFound:
      'Subscribed channels found successfully.',
    successfulSubscriptionCreate: 'Subscription created successfully.',
    successfulSubscribedChannelFound: 'Subscribed channel found successfully.',
    successfulSubscriptionDelete: 'Subscribed channel deleted successfully.',
    successfulAccountCreate: 'Account created successfully.',
    successfulUsersFound: 'Users found successfully.',
    successfulUserFound: 'User found successfully.',
    successfulAccountDelete: 'Account deleted successfully.',
    successfulPublicVideosFound: 'Public videos found successfully.',
    successfulPrivateVideosFound: 'Private videos found successfully.',
    successfulVideoFound: 'Video found successfully.',
    successfulVideoCreate: 'Video created successfully.',
    successfulVideoDetailsUpdate: 'Video details updated successfully.',
    successfulVideoThumbnailUpdate: 'Video thumbnail updated successfully.',
    successfulVideoDelete: 'Video deleted successfully.'
  },
  ar: {
    fieldsRequired: 'برجاء إدخال جميع البيانات المطلوبة.',
    passwordLength:
      'كلمة المرور يجب أن تكون أطول من 8 أحرف ومكونة من أحرف وأرقام ورموز.',
    roleRestriction: 'نوع الحساب يجب أن يكون واحد من هؤلاء: مستخدم.',
    emailTaken:
      'البريد الإلكتروني مستخدم من قبل, من فضلك ادخل بريد إلكتروني أخر.',
    emailPasswordRequired:
      'برجاء إدخال كلاً من البريد الإلكتروني وكلمة المرور.',
    passwordUpdateRoute:
      'لا يمكنك تحديث كلمة المرور من هنا, برجاء الذهاب إلي المكان المخصص لتغيير كلمة المرور',
    incorrectEmailOrPassword: 'خطأ في البريد الإلكتروني أو كلمة المرور.',
    loginAgain: 'رجاءً, قم بتسجيل الدخول مرةً أُخري!',
    passConfirm: 'يجب علي كلمة المرور وتأكيد كلمة المرور ان يكونوا متشابهين.',
    invalidLink: 'الرابط غير صحيح او مدته انتهت.',
    notSamePassword:
      'هذه ليست كلمة المرور الخاصة بك. برجاء ادخال كلمة المرور الحالية.',
    noTokenFound: 'لم يتم العثور علي الرمز.',
    noUserFound: 'لم يتم العثور علي المستخدم.',
    notAuthorized: 'لست مصرح بتنفيذ ذلك الأمر.',
    emailVerified: 'البريد الإلكتروني مفعلا.',
    notPublicVideo:
      'هذا الفيديو ليس عام, لا يمكنك عمل يعجبني/لا يعحبني علي هذا الفيديو.',
    noCategoriesFound: 'لم يتم العثور علي أي تصنيفات.',
    noCommentsFound: 'لم يتم العثور علي أي تعليقات.',
    noCommentFound: 'لم يتم العثور علي التعليق.',
    noVideoFound: 'لم يتم العثور الفيديو.',
    noFeelingFound: 'لم يتم العثور علي تفاعل.',
    noFeelingsFound: 'لم يتم العثور علي أي تفاعلات.',
    sameVideoCreator: 'لا يمكنك التفاعل علي الفيديو الخاص بك.',
    noHistoryFound: 'لم يتم العثور علي اي بحث قديم.',
    noRepliesFound: 'لم يتم العثور علي أي ردود.',
    noReplyFound: 'لم يتم العثور علي الرد.',
    noSubscribedChannelsFound: 'لم يتم العثور علي أي قنوات تتابعها.',
    noSubscribedChannelFound: 'لم يتم العثور علي القناة.',
    ownSubscribe: 'لا يمكنك متابعة قناتك الشخصية.',
    noUsersFound: 'لم يتم العثور علي أي مستخدمين.',
    noChannelFound: 'لم يتم العثور علي القناة.',
    noVideosFound: 'لم يتم العثور علي أي فيديوهات.',
    notVideoCreator: 'انت لست من قام بإنشاء الفيديو.',
    successfulSignUp: 'تم إنشاء الحساب بنجاح. برجاء تفعيل البريد الإلكتروني.',
    successfulLogin: 'تم تسجيل الدخول بنجاح.',
    successfulLogout: 'تم تسجيل الخروج بنجاح.',
    successfulTokenGeneration: 'تم إعادة إنشاء الرموز بنجاح.',
    successfulResetLink:
      'تم إرسال رابط إعاد تغيير كلمة المرور إلي بريدك الإلكتروني بنجاح.',
    successfulPasswordChange: 'تم تغيير كلمة المرور بنجاح.',
    successfulSendVerificationEmail:
      'تم إرسال رابط تفعيل البريد الإلكتروني لك بنجاح.',
    successfulEmailVerification: 'تم تفعيل البريد الإلكتروني بنجاح.',
    successfulCategoryCreate: 'تم إنشاء التصنيف بنجاح.',
    successfulCategoriesFound: 'تم العثور علي التصنيفات بنجاح.',
    successfulCategoryFound: 'تم العثور علي التصنيف بنجاح.',
    successfulCategoryUpdate: 'تم تحديث التصنيف بنجاح.',
    successfulCategoryDelete: 'تم حذف التصنيف بنجاح.',
    successfulCommentsFound: 'تم العثور علي التعليقات بنجاح.',
    successfulCommentCreate: 'تم إنشاء التعليق بنجاح.',
    successfulCommentUpdate: 'تم تعديل التعليق بنجاح.',
    successfulCommentDelete: 'تم حذف التعليق بنجاح.',
    successfulFeelingCreate: 'تم إنشاء التفاعل بنجاح.',
    successfulFeelingRemove: 'تم حذف التفاعل بنجاح.',
    successfulFeelingTrigger: 'تم اختيار التفاعل المناظر بنجاح.',
    successfulFeelingFound: 'تم العثور علي التفاعل.',
    successfulLikedVideosFound: 'تم العثور علي الفيديوهات المعجب بها',
    successfulHistoryFound: 'تم العثور علي الابحاث القديمة بنجاح.',
    successfuladdHistoryItem: 'تم اضافة العنصر إلي البحث القديم بنجاح.',
    successfulHistoryItemDelete: 'تم حذف العنصر من البحث القديم بنجاح.',
    successfulHistoryDelete: 'تم حذف البحث القديم بنجاح.',
    successfulProfileDataFound: 'تم العثور علي بيانات الحساب بنجاح.',
    successfulDataUpdate: 'تم تحديث بيانات الحساب بنجاح.',
    successfulProfileImage: 'تم تحديث الصورة الشخصية بنجاح.',
    successfulProfileDelete: 'تم حذف الحساب بنجاح.',
    successfulRepliesFound: 'تم العثور علي الردود بنجاح.',
    successfulReplyFound: 'تم العثور علي الرد بنجاح.',
    successfulReplyCreate: 'تم إنشاء الرد بنجاح.',
    successfulReplyUpdate: 'تم تحديث الرد بنجاح.',
    successfulReplyDelete: 'تم حذف الرد بنجاح.',
    successfulSubscribedChannelsFound:
      'تم العثور علي القنوات التي تتابعها بنجاح.',
    successfulSubscriptionCreate: 'تم القيام بمتابعة القناة بنجاح.',
    successfulSubscribedChannelFound:
      'تم العثور علي القناة التي تتابعها بنجاح.',
    successfulSubscriptionDelete: 'تم حذف القناة التي تتابعها بنجاح.',
    successfulAccountCreate: 'تم إنشاء الحساب بنجاح.',
    successfulUsersFound: 'تم العثور علي المستخدمين بنجاح.',
    successfulUserFound: 'تم العثور علي المستخدم بنجاح.',
    successfulAccountDelete: 'تم حذف الحساب بنجاح.',
    successfulPublicVideosFound: 'تم العثور علي الفيديوهات العامة بنجاح.',
    successfulPrivateVideosFound: 'تم العثور علي الفيديوهات الخاصة بنجاح.',
    successfulVideoFound: 'تم العثور علي الفيديو بنجاح.',
    successfulVideoCreate: 'تم إنشاء الفيديو بنجاح.',
    successfulVideoDetailsUpdate: 'تم تحديث بيانات الفيديو بنجاح.',
    successfulVideoThumbnailUpdate: 'تم تحديث الصورة الخاصة بالفيديو بنجاح.',
    successfulVideoDelete: 'تم حذف الفيديو بنجاح.'
  }
};
