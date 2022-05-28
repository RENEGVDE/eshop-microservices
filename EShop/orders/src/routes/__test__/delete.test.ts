import { OrderStatus } from "@rusnvc/common";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Footwear } from "../../models/footwear";
import { Order } from "../../models/order";
import { natsWrapper } from "../../nats-wrapper";

it("Order cancelled", async () => {
  const footwear = Footwear.build({
    id: new mongoose.Types.ObjectId().toString(),
    title: "Nike",
    price: 121,
  });
  await footwear.save();

  const user = global.getCookie();

  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ footwearId: footwear.id })
    .expect(201);

  const order = await request(app)
    .delete(`/api/orders/${response.body.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  const updatedOrder = await Order.findById(response.body.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("Emits event", async () => {
  const footwear = Footwear.build({
    id: new mongoose.Types.ObjectId().toString(),
    title: "Nike",
    price: 121,
  });
  await footwear.save();

  const user = global.getCookie();

  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ footwearId: footwear.id })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${response.body.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
