const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/inotebook";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("connected to mongo successfully");
  } catch (error) {
    console.error("Failed to connect to Mongo:", error);
    process.exit(1);
  }
};

module.exports = connectToMongo;
