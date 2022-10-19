import ApiError from "./config/apiError"
import httpStatusCodes from "./config/httStatusCode"


class Api404Error extends ApiError {
    constructor (
        statusCode = httpStatusCodes.NOT_FOUND,
        message = 'Data not found',
        success = false
    ){
    super(statusCode, success, message)
}
}

export = Api404Error
