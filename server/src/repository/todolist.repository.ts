
import db from "../config/db.config"

export const getAllTodoMySQL = async()=>{
    try {
        const [todos] = await db.execute("select * from todolist")
        return todos ;
    } catch (error) {
        console.log(error);
    }
}

export const addTodosMySQL = async(name:string)=>{
    try {
         const [todos]= await db.execute("insert into todolist (name) values (?)",[name])
         return todos
    } catch (error) {
        console.log(error);
    }
}
export const updateStatusMySQL = async(id:number,status:string)=>{
    try {
         const [todos]= await db.execute("update todolist set status = ? where id = ?",[status,id])
         return todos
    } catch (error) {
        console.log(error);
    }
}
export const deleteTodosMySQL = async(id:number)=>{
    try {
         const [todos]= await db.execute("delete from todolist where id = ?",[id])
         return todos
    } catch (error) {
        console.log(error);
    }
}
