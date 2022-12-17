import { useEffect, useState } from "react";
import { json, Link, Navigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsPatchCheckFill } from "react-icons/bs";
import { DisplayDescription } from "./displayDescription";
import { Utility } from "./utility";
import { IdsObjectUtility } from "./idsObjectUtility";

export const Home = () => {
  const [show, setShow] = useState(false);
  const [showId, setShowId] = useState("");
  const [task, setTask] = useState("");
  const [des, setDes] = useState("");
  const token = Utility();

  var idsObject = IdsObjectUtility();
  const [toShow, setToShow] = useState(false);

  const [todos, setTodos] = useState([]);

  const myClass =
    "flex justify-between  border-2 rounded-lg  text-white px-2 my-4 ";

  useEffect(() => {
    getTodos();
  }, []);

  // useEffect(() => {}, [toShow]);

  async function getTodos() {
    try {
      // axios GET request
      const options = {
        url: "http://localhost:8080/api/todo-controller/get-todos",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      };
      const response = await axios(options);
      setTodos(response.data);
      console.log(response, "Todos response");
      console.log(todos, "list");
    } catch (err) {
      console.log(err);
    }
  }

  async function saveTodo() {
    try {
      console.log(task, des);
      // axios POST request
      const options = {
        url: "http://localhost:8080/api/todo-controller/post-todo",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          name: task,
          description: des,
        },
      };

      const response = await axios(options);
      console.log(response, "SaveTask response");
      getTodos();
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteTodo(id) {
    try {
      // axios DELETE request
      const options = {
        url: `http://localhost:8080/api/todo-controller/delete-todo/${id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      };
      const response = await axios(options);
      console.log(response.data, "deleteTodo response");
      // console.log(todos,'list')
      getTodos();
    } catch (err) {
      console.log(err);
    }
  }

  function taskCompleted(todo) {
    let idsObject = JSON.parse(localStorage.getItem("idsObject"));
    if (idsObject) {
      idsObject[todo.id] = true;
    } else {
      idsObject = {};
      idsObject[todo.id] = true;
    }
    localStorage.setItem("idsObject", JSON.stringify(idsObject));
    setToShow(!toShow);
    // console.log("toShow", toShow);
  }

  function handleTask(e) {
    setTask(e.target.value);
    // console.log(task);
  }
  function handleDescription(e) {
    setDes(e.target.value);
    // console.log(des);
  }

  return (
    <>
      {(token && token.length > 1) || toShow ? (
        <div className="Home ">
          <div className="flex w-11/12 m-auto justify-between ">
            <div className="w-1/3 bg-[rgb(15,23,42)] m-auto my-16 pb-12 rounded-lg px-8">
              <h1 className="text-white text-center text-xl pt-8">Todo-List</h1>
              <div className="flex flex-col gap-2 mt-4 mx-16">
                <input
                  className="rounded px-2 bg-black text-white"
                  placeholder="Task Name"
                  onKeyDown={handleTask}
                />
                <input
                  className="rounded px-2 bg-black text-white"
                  placeholder="Task Description"
                  onKeyDown={handleDescription}
                />
                <button
                  className="bg-orange-500 w-auto rounded-lg text-white px-2 py-2"
                  onClick={saveTodo}
                >
                  Submit
                </button>
              </div>
              <div className="mt-8">
                {todos?.map((todo) => (
                  <div
                    key={todo.id}
                    className={
                      idsObject && idsObject[todo.id]
                        ? myClass + "bg-green-700"
                        : myClass
                    }
                  >
                    <div
                      className="basis-3/4 py-2"
                      onClick={() => {
                        setShow(true);
                        setShowId(todo.id);
                      }}
                    >
                      {todo.name}
                    </div>
                    <div className="flex gap-4 py-2">
                      <button
                        onClick={() => {
                          taskCompleted(todo);
                        }}
                      >
                        <BsPatchCheckFill />{" "}
                      </button>
                      <Link to={`/editTodo/${todo.id}`}>
                        <button>
                          <AiOutlineEdit />
                        </button>
                      </Link>
                      <button onClick={() => deleteTodo(todo.id)}>
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {show && (
              <div className="w-1/3 bg-[rgb(15,23,42)] m-auto mt-16 pb-12 rounded-lg px-8 text-center">
                <DisplayDescription id={showId} />
                <button
                  className="bg-orange-500 px-4 py-2 rounded-lg text-white"
                  onClick={() => setShow(false)}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
};
