module.exports = {
  reactStrictMode: true,
  env: {
    DB_LOCAL_URI: "mongodb://localhost:27017/room_booking",
    CLOUDINARY_CLOUD_NAME: "lesha",
    CLOUDINARY_API_KEY: "869167493588397",
    CLOUDINARY_SECRET: "A46Ty2J25dsjNCKd8CvBZh35tDk",
  },
  images: {
    domains: ["res.cloudinary.com", "a0.muscache.com"],
  },
};
