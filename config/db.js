const mongoose = require("mongoose");

const connect = async () => {
  try {
    const connectValue = await mongoose.connect(process.env.DATABASEURL);
    console.log(`MONGODB CONNECTED:${connectValue.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connect;
