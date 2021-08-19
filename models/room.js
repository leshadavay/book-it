const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please input room name"],
    trim: true,
    maxLength: [100, "Room name should be up to 100 characters"],
  },
  pricePerNight: {
    type: Number,
    required: [true, "Please input room price"],

    maxLength: [5, "Room price should be up to 5 characters"],
  },
  description: {
    type: String,
    required: [true, "Please input room price"],
  },
  address: {
    type: String,
    required: [true, "Please input room address"],
  },
  guestCapacity: {
    type: Number,
    required: [true, "Please input room guests capacity"],
  },
  numOfBeds: {
    type: Number,
    required: [true, "Please input number of beds in room"],
  },
  internet: {
    type: Boolean,
    default: false,
  },
  breakfast: {
    type: Boolean,
    default: false,
  },
  airConditioned: {
    type: Boolean,
    default: false,
  },
  petsAllowed: {
    type: Boolean,
    default: false,
  },
  roomCleaning: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please input room category"],
    enum: {
      values: ["King", "Single", "Twins"],
      message: "Please select correct category",
    },
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        /* required: true, */
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    /* required: true, */
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Room || mongoose.model("Room", roomSchema);
