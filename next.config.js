module.exports = {
  reactStrictMode: true,
  env: {
    DB_LOCAL_URI: "mongodb://localhost:27017/room_booking",
    DB_URI:
      "mongodb+srv://admin:<Cloudmongodb4$>@cluster0.7ceub.mongodb.net/fakebook?retryWrites=true&w=majority",

    STRIPE_API_KEY:
      "pk_test_51JY8UnDasotYSPMe2u9T5ucUInOzYXHGjxJS8yjGMAau3DHroXwE5mPhbfudO6vQDxj93WXIQWMfnntlLfbHrPNt00ZKTA96jC",
    STRIPE_SECRET_KEY:
      "sk_test_51JY8UnDasotYSPMeWBU4nAJKK33UkkLuj7JK9OMtKaPjfOafre8hDb9DLJCbYgs7WfsGBKJSc3pHAMavIPSIhGh000WnrctPxr",

    STRIPE_WEBHOOK_SECRET: "whsec_MoxRILRApLwu5YgLRCWzNcfMOO4s7U5R",

    CLOUDINARY_CLOUD_NAME: "lesha",
    CLOUDINARY_API_KEY: "869167493588397",
    CLOUDINARY_SECRET: "A46Ty2J25dsjNCKd8CvBZh35tDk",
    SMTP_HOST: "smtp.mailtrap.io",
    SMTP_PORT: "2525",
    SMTP_USER: "5fe20ee66c7ea9",
    SMTP_PASSWORD: "c10d8ce207f5eb",
    SMTP_FROM_NAME: "FakeBook",
    SMTP_FROM_EMAIL: "noreply@fakebook.com",

    NEXT_AUTH_URL: "",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};
