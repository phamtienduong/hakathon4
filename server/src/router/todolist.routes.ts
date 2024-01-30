import {Express} from "express"
import {addTodos,  deleteTodo,  getAllTodo, updateStatus} from "../controller/todolist.controller"

export const productRouter = (app:Express)=>{
 app.get("/api/v1/todos",getAllTodo)
 app.post("/api/v1/todos",addTodos)
 app.put("/api/v1/todos/status/:id",updateStatus)
 app.delete("/api/v1/todos/:id",deleteTodo)

}