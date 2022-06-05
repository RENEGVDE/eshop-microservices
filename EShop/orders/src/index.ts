import mongoose from "mongoose";
import { app } from "./app";
import { ExpirationCompleteListener } from "./events/listeners/expiration-complete-listener";
import { FootwearCreatedListener } from "./events/listeners/footwear-created-listener";
import { FootwearUpdatedListener } from "./events/listeners/footwear-updated-listener";
import { PaymentCreatedListener } from "./events/listeners/payment-created-listener";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  console.log("start !")
  
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY undef");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI undef");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID undef");
  }
  if (!process.env.NATS_URL) {
    throw new Error("MONGO_URL undef");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID undef");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS disconnected");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new FootwearCreatedListener(natsWrapper.client).listen();
    new FootwearUpdatedListener(natsWrapper.client).listen();
    new ExpirationCompleteListener(natsWrapper.client).listen();
    new PaymentCreatedListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Port: 3000");
  });
};

start();
