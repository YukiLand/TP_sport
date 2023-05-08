const mongoose = require("mongoose");
const db = process.env.ATLAS_URL;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(db);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
