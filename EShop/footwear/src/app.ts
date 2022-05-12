import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler } from "@rusnvc/common";
import { NotFoundError } from "@rusnvc/common";
import { createFootwearRouter } from "./routes/new";
import { currentUser } from "@rusnvc/common";
import { showFootwearRouter } from "./routes/show";
import { indexFootwearRouter } from "./routes";
import { updatedFootwearRouter } from "./routes/update";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);

app.use(createFootwearRouter);
app.use(showFootwearRouter);
app.use(indexFootwearRouter);
app.use(updatedFootwearRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
