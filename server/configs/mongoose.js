const mongoose = require("mongoose");
const bluebird = require("bluebird");

/**
 * Connect to MongoDB
 */
let connectDB = () => {
  mongoose.Promise = bluebird;

  let URI = "mongodb://localhost:27017/QLNV"
  console.log(URI);
  return mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
