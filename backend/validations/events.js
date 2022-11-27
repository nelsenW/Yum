const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

// validateTweetInput is a combination Express middleware that uses the check
// middleware to validate the keys in the body of the request to create/edit
// a tweet
const validateEventInput = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Title must be present between 2 and 50 characters")
    .isLength({ min: 2, max: 50 })
    .withMessage("Title must be between 2 and 50 characters"),

  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Descrition must exist between 5 and 255 characters")
    .isLength({ min: 5, max: 255 })
    .withMessage("Description must be between 5 and 255 characters"),

  check("date")
    .exists({ checkFalsy: true })
    .withMessage("Date must be included")
    .isLength({ min: 0 }),

  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price is invalid")
    .isLength({ min: 0 }),

  check("location")
    .exists({ checkFalsy: true })
    .withMessage("Location must be included"),

  check("eventType")
    .exists({ checkFalsy: true })
    .withMessage("Event Type must be included"),

  check("host")
    .exists({ checkFalsy: true })
    .withMessage("Host must be included"),

  check("guestNumber")
    .isLength({ min: 1 })
    .withMessage("Must allow at least one guest"),

  handleValidationErrors,
];

module.exports = validateEventInput;
