import ApiError from "./config/apiError"
import httpStatusCodes from "./config/httStatusCode"


class Api500Error extends ApiError {
    constructor (
        statusCode = httpStatusCodes.INTERNAL_SERVER,
        message = 'Internal server Error',
        success = false
    ){
    super(statusCode, success, message)
}
}

export = Api500Error
