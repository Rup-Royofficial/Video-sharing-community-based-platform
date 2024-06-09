// The ApiResponse class is designed to standardize the structure of responses sent from an API. 
// It helps ensure that responses from the server are consistent in format, which can simplify handling responses on the client side.

class ApiResponse {
    /*
    Constructor Parameters:
        statusCode: The HTTP status code of the response (e.g., 200 for success, 404 for not found, 500 for server error).
        data: The actual data to be sent in the response (e.g., the result of a database query, a success message, etc.).
        message: A descriptive message about the response (default: "Success").
    */
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode // Stores the provided HTTP status code.
        this.data = data // Stores the provided data.
        this.message = message // Stores the provided message or defaults to "Success".
        this.success = statusCode < 400 //  A boolean indicating whether the operation was successful, determined by checking if the statusCode is less than 400 
    }
}

export { ApiResponse }