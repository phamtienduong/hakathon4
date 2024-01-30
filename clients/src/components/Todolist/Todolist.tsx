import { ChangeEvent, useEffect, useState } from "react";
import "./Todolist.css";
import axios from "axios";
interface Todo {
  id: number;
  name: string;
  status: number;
}
export default function Todolist() {
  const [newTodo, setNewTodo] = useState<any>({
    name: "",
    status: 0,
  });
  const [allTodos, setAllTodos] = useState<Array<Todo>>([]);
  const [flag, setFlag] = useState(false);
  const handleGetAllTodo = async () => {
    try {
      const res = await axios.get("http://localhost:7800/api/v1/todos");
      console.log(res.data.data);
      setAllTodos(res.data.data);
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    handleGetAllTodo();
  }, [flag]);
  const handleAdd = async () => {
    if (!newTodo.name) {
      return;
    } else {
      try {
        const res = await axios.post(
          "http://localhost:7800/api/v1/todos",
          newTodo
        );
        console.log(newTodo);
        setNewTodo({ ...newTodo, name: "" });

        setFlag(!flag);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleGetInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };
  const handleDelete = async (id: number) => {
    let check = confirm("Bạn có muốn xoá không");
    if (check) {
      try {
        const res = await axios.delete(
          `http://localhost:7800/api/v1/todos/${id}`
        );
        setFlag(!flag);
      } catch (error) {
        console.log("error");
      }
    }
  };
  const changeStatus = async (checked:any, id:number) => {
    try {
        console.log(checked)
      const status = checked ? 1 : 0;
      console.log(status);
      const response = await axios.put(
        `http://localhost:7800/api/v1/todos/status/${id}`,
        { status:status } // Send the updated status
      );
      setFlag(!flag);

    //   response.then(res =>{
    //     // setAllTodo(response.data.todo);
    //   })
    //   setAllTodo(response.data.todo);
    //   setFlag(!flag);
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <div>
      <div id="container">
        <div className="header">
          <h1>Todo List</h1>
          <p> All of todos in 2024</p>
        </div>
        <div className="main">
          {allTodos?.map((item, index) => (
            <div key={index} className="main__bg">
              <div className="main__todo">
                <div
                style={{ textDecoration: item.status ? "line-through" : "" }}
                 className="main__todo--text">
                  <p>{item.name}</p>
                </div>
                <div className="main__todo--icon">
                  <input
                    type="checkbox"
                    onChange={(e) => changeStatus(e.target.checked, item.id)}
                    value={item.status}
                    checked={item.status ?true:false}
                    style={{ width: "15px", height: "15px" }}
                  />
                  <div>
                    <span
                      onClick={() => handleDelete(item.id)}
                      className="material-symbols-outlined"
                      style={{
                        fontSize: "20px",
                        opacity: "1",
                        marginLeft: "25px",
                        cursor: "pointer",
                        color: "#fff",
                      }}
                    >
                      delete
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="footer">
          <p>Add to the todo list</p>
          <div className="footer__input">
            <div className="footer__input--input">
              <input
                name="name"
                value={newTodo.name}
                onChange={handleGetInput}
                className="input"
                type="text"
              />
            </div>
            <div className="footer__input--button">
              <button onClick={handleAdd} className="btn">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
