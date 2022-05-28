import request from "supertest";
import { app } from "../../app";

it("get auth user", async () => {
  //   const authResp = await request(app)
  //     .post("/api/users/signup")
  //     .send({
  //       email: "test@test.com",
  //       password: "212121212121",
  //     })
  //     .expect(201);
  const cookie = await global.getCookie();
  //   console.log(cookie)

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

// it("no user if not signed in", async () => {
//   const response = await request(app).get("/api/users/currentuser").send();

//   expect(response.body.currentUser).toEqual(null);
// });
