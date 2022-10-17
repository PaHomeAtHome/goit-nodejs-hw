const app = require("./app");
require("dotenv").config();
const { connectMongo } = require("./src/db/connection");
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectMongo();
    console.log("Database connection successful");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  app.listen(PORT, (err) => {
    if (err) console.error("Error at server launch ", err);
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
};

start();
