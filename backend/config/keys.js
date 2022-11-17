module.exports = {
  secretOrKey: process.env.SECRET_OR_KEY,
  mongoURI: process.env.MONGO_URI,
  isProduction: process.env.NODE_ENV === "production",
  s3AccessKey: process.env.S3_ACCESS_KEY,
  s3AccessSecret: process.env.S3_ACCESS_SECRET,
};
