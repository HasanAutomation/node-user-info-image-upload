const mongoose = require('mongoose');
async function connectDB() {
  try {
    const result = await mongoose.connect(process.env.MONGO_URI);
    console.log('MONGO Connected', result.connection.host);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
