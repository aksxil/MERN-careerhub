class ErrorHandler extends Error {
    constructor(messaage,statusCode){
        super(messaage);
        this.statusCode = statusCode;
        Error.captureStackTrace(this,this.constructor)
    }
}

module.exports = ErrorHandler;