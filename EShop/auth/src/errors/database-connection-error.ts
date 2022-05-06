import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError{

    statusCode = 500
    reason = 'Error connecting to DB'

    constructor() {
        super('DB connection err');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors() {
        return[
            {message: this.reason}
        ]
    }
}