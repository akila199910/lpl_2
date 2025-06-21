import { errorResponse } from "../utils/apiResponse.mjs";

export const errorHandlerMiddleware = (err, req, res, next) => {

    const status = err.statusCode || 500;
    const response = errorResponse(err.message || 'Something went wrong');

    if (err.errorData) {
        response.errorData = err.errorData;
      }

      res.status(status).json(response);
};