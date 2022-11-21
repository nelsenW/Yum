const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    eventType: {
      type: String,
      default: "both",
      enum: ["in-person", "to-go", "both"],
    },
    host: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    images: [
      {
        type: String,
      },
    ],
    guestNumber: {
      type: Number,
      required: true,
    },
    guestLists: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    restrictions: {
      type: [String],
    },
    expireAt: {
      type: Date,
      expires: 86400,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
