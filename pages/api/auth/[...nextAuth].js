import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import mongoDBConnect from "../../../config/db";
import User from "../../../models/user";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        mongoDBConnect();
        const { email, password } = credentials;

        //check if email and password is entered
        if (!email || !password) {
          throw new Error("Please enter email or password");
        }

        //find user from db
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
          throw new Error("Invalid Email or password");
        }

        //check if password is correct
        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
          throw new Error("Invalid Email or Password");
        }

        return Promise.resolve(user);
      },
    }),
  ],
  callbacks: {
    jwt: async (token, user) => {
      user && (token.user = user);
      return Promise.resolve(token);
    },
    session: async (session, token) => {
      //this token is from jwt callback promise
      session.user = token.user;
      return Promise.resolve(session);
    },
  },
});
