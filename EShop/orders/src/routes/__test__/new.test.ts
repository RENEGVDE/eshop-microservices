import { OrderStatus } from "@rusnvc/common";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Footwear } from "../../models/footwear";
import { Order } from "../../models/order";
import { natsWrapper } from "../../nats-wrapper";

it("Returns err if no footwear", async () => {
  const footwearId = new mongoose.Types.ObjectId();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.getCookie())
    .send({ footwearId })
    .expect(404);
});

it("Returns err if footwear reserved", async () => {
  const footwear = Footwear.build({
    id: new mongoose.Types.ObjectId().toString(),
    title: "Nike",
    price: 121,
  });
  await footwear.save();
  const order = Order.build({
    footwear,
    userId: "MEEEEEE",
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.getCookie())
    .send({ footwearId: footwear.id })
    .expect(400);
});

it("Reserves footwear", async () => {
  const footwear = Footwear.build({
    id: new mongoose.Types.ObjectId().toString(),
    title: "Nike",
    price: 121,
  });
  await footwear.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.getCookie())
    .send({ footwearId: footwear.id })
    .expect(201);
});

it("Emits event", async () => {
  const footwear = Footwear.build({
    id: new mongoose.Types.ObjectId().toString(),
    title: "Nike",
    price: 121,
  });
  await footwear.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.getCookie())
    .send({ footwearId: footwear.id })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
