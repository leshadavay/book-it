module.exports = {
  reactStrictMode: true,
  env: {
    DB_LOCAL_URI: "mongodb://localhost:27017/room_booking",
    CLOUDINARY_CLOUD_NAME: "lesha",
    CLOUDINARY_API_KEY: "869167493588397",
    CLOUDINARY_SECRET: "A46Ty2J25dsjNCKd8CvBZh35tDk",
    SMTP_HOST: "smtp.mailtrap.io",
    SMTP_PORT: "2525",
    SMTP_USER: "5fe20ee66c7ea9",
    SMTP_PASSWORD: "c10d8ce207f5eb",
    SMTP_FROM_NAME: "FakeBook",
    SMTP_FROM_EMAIL: "noreply@fakebook.com",
  },
  images: {
    domains: ["res.cloudinary.com", "a0.muscache.com"],
  },
};
