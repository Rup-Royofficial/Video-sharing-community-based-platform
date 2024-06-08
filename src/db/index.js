import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'

const connectedDB = async () => {
    try {
        // mongoose returns an object on successful connection to the db
        // connectionInstance stores available responses on successful connection
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)// connecting MONGO Database through the specified URL & DB name 

        // to identify in which host connection is made, as there are many db servers such as test, production etc...
        console.log(`\nMONGODB connected  !!  DB HOST:${connectionInstance.connection.host}`); 
        
        // console.log(connectionInstance); // checking
    } catch (error) {
        console.log(`Failed to connect to Database:${DB_NAME} !!! ${error}`);
        // you have the option of use throws error, or else use the below form
        process.exit(1)
        /*
        process is provided by node

        The process.exit() method instructs Node.js to terminate the process synchronously with an exit status of code. 
        If code is omitted, exit uses either the 'success' code 0 or the value of process.exitCode if it has been set. 
        Node.js will not terminate until all the 'exit' event listeners are called.
         */
    }
}

export default connectedDB