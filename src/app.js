import express from 'express'

const app = express()

export { app }
/*
 `export default app` : Exports app as the default export. You can import it with any name you choose.
 `export { app }`     : Exports app as a named export. You must use the same name (or an alias) when importing.
*/