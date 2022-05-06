import { CustomError } from "./custom-error";

export class NotAuthorizedEroor extends CustomError {
  statusCode = 401;

  constructor() {
    super("Unauthorized");

    Object.setPrototypeOf(this, NotAuthorizedEroor.prototype);
  }

  serializeErrors() {
    return [{ message: "Unauthorized" }];
  }
}
