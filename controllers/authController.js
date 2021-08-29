import tryCatchAsyncErrors from "../middlewares/tryCatchAsyncErrors";
import User from "../models/user";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/errorHandler";

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

export { registerUser, currentUserProfile, updateUserProfile };
