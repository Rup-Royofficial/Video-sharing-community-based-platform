/* This form is a higher-order function meant to wrap asynchronous route handlers in Express.js, 
   providing a way to handle errors gracefully without having to use try-catch blocks in each route handler.
    
    const asyncHandler = (func) => async () => {}
*/


const asyncHandler = (requestHandler) => { 
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }
}

export { asyncHandler }







/*
    One of the forms to write this specfic asyncHandler function involves try-catch block
    You can use this form for asynchronous handling or use the above form

    const asyncHandler = (fn) => async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            res.status(err.code || 500).json({
                success: false,
                message: err.message
            })
        }
    }


    asyncHandler: Takes an asynchronous function (fn) as an argument.
    Returned Function: This function is an async function that receives req, res, and next as arguments.
    try-catch Block:
        try: Calls the provided fn with req, res, and next.
        catch:  Catches any error thrown by fn and responds with a JSON error message. 
                The status code defaults to 500 if err.code is not provided.
*/