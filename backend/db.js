const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI

const connectTo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to database");
    
    const itemsData = mongoose.connection.db.collection("food_items");
    const categoryData = mongoose.connection.db.collection("foodCategory");

    let data = await itemsData.find({}).toArray();
    global.food_items = data;
    data = await categoryData.find({}).toArray();
    global.foodCategory = data;

  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

module.exports = connectTo;
