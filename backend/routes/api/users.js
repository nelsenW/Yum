const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");
const {
  loginUser,
  restoreUser,
  requireUser,
} = require("../../config/passport");
const { isProduction } = require("../../config/keys");
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");
const validateReviewsInput = require("../../validations/reviews");

//all users
router.get("/", async function (req, res, next) {
  if (!isProduction) {
    const user = await User.find();
    return res.json(user);
  }

  res.json({
    message: "GET /api/users",
  });
});

//register user
router.post("/register", validateRegisterInput, async (req, res, next) => {
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });

  if (user) {
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    return next(err);
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user));
      } catch (err) {
        next(err);
      }
    });
  });
});

//login user
router.post("/login", validateLoginInput, async (req, res, next) => {
  passport.authenticate("local", async function (err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error("Invalid credentials");
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

// posting a guest review under User
router.post(
  "/:id/guest_reviews/",
  validateReviewsInput,
  async (req, res, next) => {
    let user;
    try {
      user = await User.findById(req.params.id);
      let newReview = {
        ...req.body,
      };
      user.guestReviews.push(newReview);
      newUser = await user.save();
      return res.json(newUser);
    } catch (err) {
      const error = new Error("Something went wrong");
      error.statusCode = 404;
      error.errors = { message: "Something went wrong saving" };
      return next(error);
    }
  }
);

// posting a host reviews
router.post(
  "/:id/host_reviews/",
  validateReviewsInput,
  async (req, res, next) => {
    let user;
    try {
      // find user to create review user
      user = await User.findById(req.params.id);
      let newReview = {
        ...req.body,
      };
      user.hostReviews.push(newReview);
      newUser = await user.save();
      return res.json(newUser);
    } catch (err) {
      const error = new Error("Something went wrong");
      error.statusCode = 404;
      error.errors = { message: "Something went wrong saving" };
      return next(error);
    }
  }
);

//update a host reviews
router.patch("/:id/host_reviews/:review_id", async (req, res, next) => {
  try {
    const filter = {
      _id: req.params.id,
      "hostReviews._id": req.params.review_id,
    };
    const update = { $set: { "hostReviews.$": { ...req.body } } };
    await User.findOneAndUpdate(filter, update, { new: true });
    return res.json("Event updated");
  } catch (err) {
    const error = new Error("Something went wrong");
    error.statusCode = 404;
    error.errors = { message: "something went wrong" };
    return next(error);
  }
});

//update a guest reviews
router.patch("/:id/guest_reviews/:review_id", async (req, res, next) => {
  try {
    const filter = {
      _id: req.params.id,
      "guestReviews._id": req.params.review_id,
    };
    const update = { $set: { "guestReviews.$": { ...req.body } } };
    await User.findOneAndUpdate(filter, update, { new: true });
    return res.json("Event updated");
  } catch (err) {
    const error = new Error("Something went wrong");
    error.statusCode = 404;
    error.errors = { message: "something went wrong" };
    return next(error);
  }
});

//delete host review
router.delete("/:id/host_reviews/:review_id", async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    const newUser = user.hostReviews.id(req.params.review_id).remove();
    await user.save();
    return res.json("Event delete");
  } catch (err) {
    const error = new Error("Something went wrong");
    error.statusCode = 404;
    error.errors = { message: "something went wrong" };
    return next(error);
  }
});

//delete guest review
router.delete("/:id/guest_reviews/:review_id", async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    const newUser = user.guestReviews.id(req.params.review_id).remove();
    await user.save();
    return res.json("Event delete");
  } catch (err) {
    const error = new Error("Something went wrong");
    error.statusCode = 404;
    error.errors = { message: "something went wrong" };
    return next(error);
  }
});

router.get("/current", restoreUser, (req, res) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  });
});

module.exports = router;
