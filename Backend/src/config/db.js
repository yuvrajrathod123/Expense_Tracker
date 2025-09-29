// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// // dotenv.config({ path: require("path").resolve(__dirname, "../.env") });
// dotenv.config()

// const URL = process.env.DB_URL;

// const connectDB = async () => {
//   try {
//     console.log(URL);
//     console.log(process.env.PORT)
//     await mongoose.connect(URL);
//     console.log("✅ MongoDB Connected");
//     return true;
//   } catch (error) {
//     console.error("❌ Error connecting to MongoDB:", error.message);
//     process.exit(1); 
//   }
// };

// module.exports = connectDB;



const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Explicitly set the .env path
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const URL = process.env.DB_URL;
const PORT = process.env.PORT;

const connectDB = async () => {
  try {
    console.log("Mongo URL:", process.env.DB_URL);
    console.log("App Port:", process.env.PORT);

    await mongoose.connect( process.env.DB_URL);

    console.log("✅ MongoDB Connected");
    return true;
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;




