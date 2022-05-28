import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Footwear } from "../../models/footwear";

it("Fetch order", async () => {
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
    
    console.log(response.body.id)

  const order = await request(app)
    .get(`/api/orders/${response.body.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(order.body.id).toEqual(response.body.id);
});
