  export class ErrorResponse extends Error {
    constructor(message, statusCode = 500, errorData = null) {
      super(message);
      this.statusCode = statusCode;
      this.errorData = errorData;
    }
  }
  