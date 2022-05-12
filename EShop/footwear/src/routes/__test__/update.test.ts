import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns 404 if wrong id", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/footwear/${id}`)
    .set("Cookie", global.getCookie())
    .send({
      title: "Adidas",
      price: 121,
    })
    .expect(404);
});

it("returns 401 if not auth", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/footwear/${id}`)
    .send({
      title: "Adidas",
      price: 121,
    })
    .expect(401);
});

it("returns 401 if use not owner", async () => {
  const response = await request(app)
    .post("/api/footwear/")
    .set("Cookie", global.getCookie())
    .send({
      title: "Adidas",
      price: 121,
    });

  await request(app)
    .put(`/api/footwear/${response.body.id}`)
    .set("Cookie", global.getCookie())
    .send({
      title: "Nike",
      price: 111,
    })
    .expect(401);
});

it("returns 400 if invalid data", async () => {
  const cookie = global.getCookie();

  const response = await request(app)
    .post("/api/footwear/")
    .set("Cookie", cookie)
    .send({
      title: "Adidas",
      price: 121,
    });

  await request(app)
    .put(`/api/footwear/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 121,
    })
    .expect(400);

  await request(app)
    .put(`/api/footwear/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "Adidas",
      price: -121,
    })
    .expect(400);
});

it("success update", async () => {
  const cookie = global.getCookie();

  const response = await request(app)
    .post("/api/footwear/")
    .set("Cookie", cookie)
    .send({
      title: "Adidas",
      price: 121,
    });

  await request(app)
    .put(`/api/footwear/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "Nike",
      price: 122,
    })
    .expect(200);

  const footwearResp = await request(app)
    .get(`/api/footwear/${response.body.id}`)
    .send();

  expect(footwearResp.body.title).toEqual("Nike");
  expect(footwearResp.body.price).toEqual(122);
});
