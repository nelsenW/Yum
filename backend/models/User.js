const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    hostReviews:{
      _id: Schema.Types.ObjectId,
      body: String,
      rating: Number,
      guestId: Schema.Types.ObjectId
    },
    guestReviews:{
      _id: Schema.Types.ObjectId,
      title: String,
      body: String,
      rating: Number,
      guestId: Schema.Types.ObjectId
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
