import express from 'express'
import "./models/index.js"
import bodyParser from 'body-parser'
import router from './router/router.js'
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use("/", router)

app.listen(3000, () => {
    console.log('server is running in http://localhost:3000')
})