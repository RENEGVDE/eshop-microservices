import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
  console.log("start")

  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY undef");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI undef");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Port: 3000");
  });
};

start();
