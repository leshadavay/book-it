import tryCatchAsyncErrors from "../middlewares/tryCatchAsyncErrors";
import User from "../models/user";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/errorHandler";
import absoluteUrl from "next-absolute-url";
import sendEmail from "../utils/sendEmail";
import crypto from "crypto";

//set up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

//register user
const registerUser = tryCatchAsyncErrors(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  if (!avatar) {
    return next(new ErrorHandler("Please select avatar", 404));
  }

  const cloudinaryUpload = await cloudinary.v2.uploader.upload(
    req.body.avatar,
    {
      folder: "fakebook/avatars",
      width: "150",
      crop: "scale",
    }
  );

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: cloudinaryUpload.public_id,
      url: cloudinaryUpload.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "Account registered successfully",
  });
});

//get current user (/api/user/me)
const currentUserProfile = tryCatchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

//update current user (/api/user/update)
const updateUserProfile = tryCatchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name;
    user.name = req.body.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
  }

  //update avatar
  if (req.body.avatar !== "") {
    const image_public_id = user.avatar.public_id;
    //delte previous image
    await cloudinary.v2.uploader.destroy(image_public_id);
    const cloudinaryUpload = await cloudinary.v2.uploader.upload(
      req.body.avatar,
      {
        folder: "fakebook/avatars",
        width: "150",
        crop: "scale",
      }
    );

    user.avatar = {
      public_id: cloudinaryUpload.public_id,
      url: cloudinaryUpload.secure_url,
    };
  }

  //save user into db
  await user.save();

  res.status(200).json({
    success: true,
  });
});

//forgot password (/api/user/forgot)
const forgotUserPassword = tryCatchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  //get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  //get current orign
  const { origin } = absoluteUrl(req);

  //create reset password url
  const resetUrl = `${origin}/password/reset/${resetToken}`;

  const message = `Please click to the following url to reset your password:\n\n ${resetUrl}\n\n`;

  try {
    await sendEmail({
      email: user.email,
      subject: "FakeBook Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 400));
  }
});

//reset password (/api/password/reset/:token)
const resetUserPassword = tryCatchAsyncErrors(async (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords don't match ", 400));
  }

  //hash url token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.query.token)
    .digest("hex");

  //$gt => greater than
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Password reset token is invalid", 400));
  }

  //setup the new password
  user.password = req.body.password;

  //reset tokens
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Passwor is updated successfully",
  });
});

export {
  registerUser,
  currentUserProfile,
  updateUserProfile,
  forgotUserPassword,
  resetUserPassword,
};
