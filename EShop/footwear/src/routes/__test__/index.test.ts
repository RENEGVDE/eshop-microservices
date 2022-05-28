import request from "supertest";
import { app } from "../../app";

it("fetch list of footwear", async () => {
  await request(app)
    .post("/api/footwear")
    .set("Cookie", global.getCookie())
    .send({
      title: "Adidas",
      price: 120,
    });
  await request(app)
    .post("/api/footwear")
    .set("Cookie", global.getCookie())
    .send({
      title: "Nike",
      price: 121,
    });
  await request(app)
    .post("/api/footwear")
    .set("Cookie", global.getCookie())
    .send({
      title: "Nike",
      price: 122,
    });

    const response = await request(app).get('/api/footwear').send().expect(200)

    expect(response.body.length).toEqual(3)
});
