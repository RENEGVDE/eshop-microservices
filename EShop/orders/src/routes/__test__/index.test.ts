import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Footwear } from "../../models/footwear";

it("Returns orders", async () => {
  const footwear = Footwear.build({
    id: new mongoose.Types.ObjectId().toString(),
    title: "Nike",
    price: 121,
  });
  await footwear.save();

  const footwear2 = Footwear.build({
    id: new mongoose.Types.ObjectId().toString(),
    title: "Adidas",
    price: 111,
  });
  await footwear2.save();

  const footwear3 = Footwear.build({
    id: new mongoose.Types.ObjectId().toString(),
    title: "Puma",
    price: 98,
  });
  await footwear3.save();

  const user1 = global.getCookie();
  const user2 = global.getCookie();

  await request(app)
    .post("/api/orders")
    .set("Cookie", user1)
    .send({ footwearId: footwear.id })
    .expect(201);

  const resp1 = await request(app)
    .post("/api/orders")
    .set("Cookie", user2)
    .send({ footwearId: footwear2.id })
    .expect(201);
  const resp2 = await request(app)
    .post("/api/orders")
    .set("Cookie", user2)
    .send({ footwearId: footwear3.id })
    .expect(201);

  const response = await request(app)
    .get("/api/orders")
    .set("Cookie", user2)
    .expect(200);

    expect(response.body.length).toEqual(2)
    expect(response.body[0].id).toEqual(resp1.body.id)
    expect(response.body[1].id).toEqual(resp2.body.id)

    // expect(response.body[0].footwear.footwearId).toEqual(footwear2.id)
    // expect(response.body[1].footwear.footwearId).toEqual(footwear3.id)
});
