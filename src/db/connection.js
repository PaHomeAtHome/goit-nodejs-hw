const mongoose = require("mongoose");

const connectMongo = async () => {
  return (
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }) && console.log("Database connection successful")
  );
};

module.exports = { connectMongo };
