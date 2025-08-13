  export class ErrorResponse extends Error {
    constructor(message, statusCode = 500, errorObject) {
      super(message);
      this.statusCode = statusCode;
      errors = errorObject;
    }
  }
  