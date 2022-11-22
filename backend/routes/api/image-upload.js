const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config();
const keys = require("../../config/keys");

const s3 = new aws.S3({
  accessKeyId: keys.s3AccessKey,
  secretAccessKey: keys.s3AccessSecret,
  region: "us-west-1",
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    // acl: "public-read",
    s3,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    bucket: "yum-app-event-images",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}` + "-" + file.originalname);
    },
  }),
});

// const deleteImage = multer({
//   fileFilter,
//   storage: multerS3({
//     // acl: "public-read",
//     s3,
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     bucket: "yum-app-event-images",
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null, `${Date.now().toString()}` + "-" + file.originalname);
//     },
//   }),
// });

module.exports = upload;
