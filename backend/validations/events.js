const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

// validateTweetInput is a combination Express middleware that uses the check
// middleware to validate the keys in the body of the request to create/edit
// a tweet
const validateEventInput = [
    check('title')
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 50 })
    .withMessage('Title must be between 2 and 50 characters'),

    check('description')
    .exists({ checkFalsy: true })
    .isLength({ min: 5, max: 140 })
    .withMessage('Descrition must be between 5 and 140 characters'),

    check('price')
    .exists({ checkFalsy: true })
    .isLength({ min: 0})
    .withMessage('Price is invalid'),

    check('location')
    .exists({ checkFalsy: true })
    .withMessage('Location must be included'),

    check('event_type')
    .exists({ checkFalsy: true })
    .withMessage('Event Type must be inclided'),

    check('host')
    .exists({ checkFalsy: true })
    .withMessage('Host must be inclided'),

  handleValidationErrors
];

module.exports = validateTweetInput;
