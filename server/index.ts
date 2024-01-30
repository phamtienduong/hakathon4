import express from "express"
import bodyParser from "body-parser"
import { productRouter } from "./src/router/todolist.routes"
import cors from "cors"
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
productRouter(app)
const PORT:number=7800
app.listen(PORT,()=>{
    console.log("Server is running on port 7800");
})
