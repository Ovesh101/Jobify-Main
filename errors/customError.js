import { StatusCodes } from "http-status-codes";



export class BadRequestError extends Error {
    constructor(message) {
      super(message);
      this.name = 'BadRequestError';
      this.statusCode = StatusCodes.BAD_REQUEST;
    }
  }
  export class UnauthenticatedError extends Error {
    constructor(message) {
      super(message);
      this.name = 'UnauthenticatedError';
      this.statusCode = StatusCodes.UNAUTHORIZED;
    }
  }
  export class UnauthorizedError extends Error {
    constructor(message) {
      super(message);
      this.name = 'UnauthorizedError';
      this.statusCode = StatusCodes.FORBIDDEN;
    }
  }
export class NotFoundError extends Error {
    constructor(message){
    super(message)
    this.name = "Not Found Error";
    this.statusCode = StatusCodes.NOT_FOUND;
    }
    
}