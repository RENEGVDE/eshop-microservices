import request from "supertest";
import { app } from "../../app";

it("returns 201 on signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "1111111111111",
    })
    .expect(201);
});

it("returns 400 if invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "1",
      password: "1111111111111",
    })
    .expect(400);
});

it("returns 400 if invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "12",
    })
    .expect(400);
});

it("returns 400 if no email/password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "",
    })
    .expect(400);

  return request(app)
    .post("/api/users/signup")
    .send({
      email: "",
      password: "12345678",
    })
    .expect(400);
});

it("no duplicate email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "1111111111111",
    })
    .expect(201);

  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "1111111111111",
    })
    .expect(400);
});

it("sets cookie", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "12345678",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
