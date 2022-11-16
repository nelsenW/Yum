const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = Schema({
  title: {
    type: String,
    required:true
  },
  body: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  }
})

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
    hostReviews: [reviewSchema],
    guestReviews: [reviewSchema]
  },
  {
    timestamps: true,
  }
);



// userSchema.set("validateBeforeSave",false)

module.exports = mongoose.model("User", userSchema);
