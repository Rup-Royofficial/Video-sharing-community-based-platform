import dotenv from 'dotenv'
import connectedDB from './db/index.js'
import { app } from './app.js'


const port = process.env.PORT || 8000

dotenv.config({
    path: "./env"
})

connectedDB()
.then(() => {
    app.on("error",(error) => {
        console.error("Err: ", error);
        throw error
    })
    app.listen(port, () => {
        console.log(`App has connected at port: ${port}`);
    })
})
.catch()