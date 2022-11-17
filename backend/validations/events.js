const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

// validateTweetInput is a combination Express middleware that uses the check
// middleware to validate the keys in the body of the request to create/edit
// a tweet
const validateEventInput = [
    check('title')
    .exists({ checkFalsy: true })
    .withMessage('Title must be present between 2 and 50 characters')
    .isLength({ min: 2, max: 50 })
    .withMessage('Title must be between 2 and 50 characters'),

    check('description')
    .exists({ checkFalsy: true })
    .withMessage('Descrition must exist between 5 and 255 characters')
    .isLength({ min: 5, max: 255 })
    .withMessage('Descrition must be between 5 and 255 characters'),

    check('price')
    .isLength({ min: 0})
    .withMessage('Price is invalid'),

    check('location')
    .exists({ checkFalsy: true })
    .withMessage('Location must be included'),

    check('eventType')
    .exists({ checkFalsy: true })
    .withMessage('Event Type must be included'),

    check('host')
    .exists({ checkFalsy: true })
    .withMessage('Host must be included'),

    check('guestNumber')
    .isLength({ min: 1})
    .withMessage('Must allow at least one guest'),


  handleValidationErrors
];

module.exports = validateEventInput;
