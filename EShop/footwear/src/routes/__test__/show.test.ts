import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns 404 if not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/footwear/${id}`).send().expect(404);
});

it("return footwear", async () => {
  const title = "Adidas";
  const price = 121;

  const response = await request(app)
    .post("/api/footwear")
    .set("Cookie", global.getCookie())
    .send({
      title,
      price,
    })
    .expect(201);

  const footwearResponse = await request(app)
    .get(`/api/footwear/${response.body.id}`)
    .send()
    .expect(200);

  expect(footwearResponse.body.title).toEqual(title);
  expect(footwearResponse.body.price).toEqual(price);
});
