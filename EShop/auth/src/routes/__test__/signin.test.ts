import request from "supertest";
import { app } from "../../app";

it("fail with not existent email", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "1111111111111",
    })
    .expect(400);
});

it("fail wrong pass", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "1111111111111",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "11",
    })
    .expect(400);
});

it("cookie signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "1111111111111",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "1111111111111",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
