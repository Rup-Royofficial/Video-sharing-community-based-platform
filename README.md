***Video content viewing&sharing platform***

will add later
``` javascript

//Non modular code for connecting db to the app inside the index.js file
import express from "express"
const app = express()
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()
```


#






# Remember
```c
// -r dotenv/config --experimental-json-modules is primarily used cause modular approach in dotenv is still experimental
```




# ***Routing Functionality***
