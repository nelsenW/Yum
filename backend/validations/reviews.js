const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateHostReviewsInput = [

  check('title')
    .exists({ checkFalsy: true })
    .withMessage("Title must exist")
    .isLength({ min: 2, max: 30})
    .withMessage('Title must be between 2 and 30 characters'),

  check('body')
    .exists({ checkFalsy: true })
    .withMessage("Body must exist")
    .isLength({ min: 0, max: 255 })
    .withMessage('Body must be between 0 and 255 characters'),

  check('rating')
    .exists({ checkFalsy: true })
    .withMessage("Body must exist")
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),

  check('userId')
    .exists({ checkFalsy: true })
    .withMessage('User must exist'),

  handleValidationErrors
];

module.exports = validateHostReviewsInput;
