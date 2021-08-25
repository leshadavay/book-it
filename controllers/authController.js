import tryCatchAsyncErrors from "../middlewares/tryCatchAsyncErrors";
import User from "../models/user";
//register user
export const registerUser = tryCatchAsyncErrors(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "PUBLIC_ID",
      url: "URL",
    },
  });

  res.status(200).json({
    success: true,
    message: "Account registered successfully",
  });
});
