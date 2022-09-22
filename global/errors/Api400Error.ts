import ApiError from "./config/apiError"
import httpStatusCodes from "./config/httStatusCode"


class Api400Error extends ApiError {
    constructor (
        statusCode = httpStatusCodes.BAD_REQUEST,
        message = 'Bad Request...check your network or payload',
        success = false
    ){
    super(statusCode, success, message)
}
}

export = Api400Error
