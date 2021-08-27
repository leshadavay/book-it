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
export const registerUser = tryCatchAsyncErrors(async (req, res, next) => {
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
