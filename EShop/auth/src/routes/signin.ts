import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "@rusnvc/common";
import jwt from "jsonwebtoken";

import { Password } from "../services/password-manager";
import { User } from "../models/user";
import { validateRequest } from "@rusnvc/common";
import { BadRequestError } from "@rusnvc/common";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").trim().notEmpty().withMessage("Password missing"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // const errors = validationResult(req)

    // if(!errors.isEmpty()){
    //     throw new RequestValidationError(errors.array())
    // }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    //jwt
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    //sesion
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser)
  }
);

export { router as signinRouter };
