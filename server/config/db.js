const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Using Database: ${conn.connection.name}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB