class ApiError extends Error {
  statusCode: number;
    success: boolean;
  constructor (statusCode: number, success: boolean, message: string){
    super()
    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode
    this.success = success
    this.message = message
    Error.captureStackTrace(this);
  }
}

export = ApiError