import request from "supertest";
import { app } from "../../app";
import { Footwear } from "../../models/footwear";

it("has a route handler listening to api/footwear", async () => {
  const response = await request(app).post("/api/footwear").send({});

  expect(response.status).not.toEqual(404);
});

it("access when signed in", async () => {
  await request(app).post("/api/footwear").send({}).expect(401);
});

it("if signed in no err", async () => {
  const response = await request(app)
    .post("/api/footwear")
    .set("Cookie", global.getCookie())
    .send({});
  expect(response.status).not.toEqual(401);
});

it("err if invalid title", async () => {
  await request(app)
    .post("/api/footwear")
    .set("Cookie", global.getCookie())
    .send({
      title: "",
      price: 121,
    })
    .expect(400);

  await request(app)
    .post("/api/footwear")
    .set("Cookie", global.getCookie())
    .send({
      price: 121,
    })
    .expect(400);
});

it("err if invalid price", async () => {
  await request(app)
    .post("/api/footwear")
    .set("Cookie", global.getCookie())
    .send({
      title: "Adidas",
      price: -100,
    })
    .expect(400);

  await request(app)
    .post("/api/footwear")
    .set("Cookie", global.getCookie())
    .send({
      title: "Adidas",
    })
    .expect(400);
});

it("creates footwear", async () => {
  let footwear = await Footwear.find({});
  expect(footwear.length).toEqual(0);

  await request(app)
    .post("/api/footwear")
    .set("Cookie", global.getCookie())
    .send({
      title: "Adidas",
      price: 121,
    })
    .expect(201);

  footwear = await Footwear.find({});
  expect(footwear.length).toEqual(1);
});
