const Room = require("../models/room");

const rooms = require("../data/rooms");

const mongoose = require("mongoose");

const mongoDBConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    //console.log("mongoose ready state: ", mongoose.connection);
    return;
  }
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then((con) => console.log("mongodb is connected"))
    .catch((error) => console.error("mongodb connect error: ", error));
};

const seedRooms = async () => {
  try {
    mongoDBConnect();
    await Room.deleteMany();
    console.log("rooms are deleted");

    let rooms_ready = [];
    rooms.map((room) => {
      rooms_ready.push({
        ...room,
        _id: mongoose.Types.ObjectId.toString(room._id),
      });
    });
    await Room.insertMany(rooms_ready);

    console.log("all rooms are created");
  } catch (error) {
    console.log("error: ", error.message);
    process.exit();
  }
};

seedRooms();
