import mongoose from "mongoose";

const { IP_SERVER, PORT_DB, DB_NAME } = require("../config");

const connectDB = async () => {
  try {
    mongoose.set("useFindAndModify", false);
    await mongoose.connect(`mongodb://${IP_SERVER}:${PORT_DB}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("The connection with the database is established");
    console.log(`mongodb://${IP_SERVER}:${PORT_DB}/${DB_NAME}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { connectDB };
