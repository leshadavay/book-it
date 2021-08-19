import mongoose from "mongoose";

const mongoDBConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    //console.log("mongoose ready state: ", mongoose.connection);
    return;
  }
  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then((con) => console.log("mongodb is connected"))
    .catch((error) => {
      console.error("mongodb connect error: ", error);
      process.exit();
    });
};

export default mongoDBConnect;
