/*
The ApiError class created extends the built-in Error class to provide a more detailed and structured way to handle API errors in an Express application. 
This custom error class includes additional properties such as statusCode, errors, data, and success, which are useful for providing detailed error information in API responses.
*/
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message) // Calls the constructor of the parent Error class with the provided message.
        this.statusCode = statusCode //  Sets the HTTP status code.
        this.errors = errors // Sets the array of error details.
        this.message = message 
        this.data = null // Sets additional data to null
        this.success = false // Sets the success flag to false (indicating an error).

        if(stack){
            this.stack = stack // Sets the stack trace either from the provided stack or captures a new stack trace if not provided.
        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }