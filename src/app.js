import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()


/**
 * Configures the CORS middleware with specific options:
        origin: process.env.CORS_ORIGIN,    Sets the allowed origin(s) for cross-origin requests based on an environment variable. 
                                            This helps control which domains are permitted to make requests to the server.

        credentials: true       Allows credentials (such as cookies, authorization headers, or TLS client certificates) to be included in cross-origin requests. 
                                This is useful for authentication and maintaining sessions across different origins.
 */



app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


// Purpose: Parses incoming JSON requests and places the parsed data in req.body.
app.use(express.json(
    {
        limit: "16kb" // Limits the size of the JSON payload to 16 kilobytes.
    }
))



// Purpose: Parses incoming URL-encoded form data and places the parsed data in req.body.
app.use(express.urlencoded(
    {
        extended: true, // Allows for rich objects and arrays to be encoded into the URL-encoded format.
        limit: "16kb"  //  Limits the size of the URL-encoded payload to 16 kilobytes.
    }
))

// Purpose: Serves static files (HTML, CSS, JS, images, etc.) from the public directory.
app.use(express.static("public"))

// Purpose: Parses cookies attached to the client request object, making it easier to read and manipulate cookies in your application.
app.use(cookieParser())


export { app }
/*
 `export default app` : Exports app as the default export. You can import it with any name you choose.
 `export { app }`     : Exports app as a named export. You must use the same name (or an alias) when importing.
*/