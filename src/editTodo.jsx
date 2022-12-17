import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import { useState, useEffect } from "react";
import { Utility } from "./utility";

export const EditTodo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log("EditTodo id: ", id);
  const token = Utility();

  const [task, setTask] = useState("");
  const [des, setDes] = useState("");

  function handleTask(e) {
    setTask(e.target.value);
    // console.log(task);
  }
  function handleDescription(e) {
    setDes(e.target.value);
    // console.log(des);
  }

  useEffect(() => {
    getTodo(id)
  }, [id])


  async function getTodo(id) {
    try {
      // axios GET request
      const options = {
        url: `http://localhost:8080/api/todo-controller/get-todo/${id}`,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': `Bearer ${token}`,
          'Access-Control-Allow-Origin': "*"

        }
      }
      const response = await axios(options)
      setTask(response.data.name);
      setDes(response.data.description)
      console.log(response, "Todos response");
      console.log(task, des, 'get Todo from edit todo')
    }
    catch (err) {
      console.log(err);
    }

  }


  async function editTask(id) {
    try {
      // axios PUT request
      const options = {
        url: `http://localhost:8080/api/todo-controller/edit-todo/${id}`,
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': `Bearer ${token}`,
          'Access-Control-Allow-Origin': "*"

        },
        data: {
          'name': task,
          'description': des
        }
      }
      const response = await axios(options)
      console.log(response.data, "edit task data from edit todo page");
      // console.log(todos,'list')

    }
    catch (err) {
      console.log(err);
    }

  }
  return (
    // <div>
    //     <h1 className='text-white'>Edit Todo-List</h1>
    //     <div>
    //         <input placeholder='Task Name' value={task} onChange={handleTask}/>
    //         <input placeholder='Task Description' value={des} onChange={handleDescription}/>
    //         <button className='bg-orange-500' onClick={() => {editTask(id)}}>OK</button>
    //     </div>
    // </div>

    <div className="EditTodo">
      <div className='w-1/3 bg-[rgb(15,23,42)] m-auto mt-12 pb-12 rounded-lg px-8'>
        <h1 className='text-white text-center text-xl border-collapse pt-8'>Edit Todo-List</h1>
        <div className='flex flex-col gap-2 mt-4 mx-16'>
          <input className='rounded px-2 bg-black text-white' placeholder='Task Name' value={task} onChange={handleTask} />
          <input className='rounded px-2 bg-black text-white' placeholder='Task Description' value={des} onChange={handleDescription} />
          <button className='border-2 border-orange-500 hover:bg-orange-500 w-auto rounded-lg text-white px-2 py-2' onClick={() => { editTask(id); navigate(-1); }}>Submit</button>
        </div>
        {/* <div className='mt-8'>
                    {todos?.map(todo=>(
                    <div key={todo.id} className="flex justify-between  border-2 rounded-lg  text-white p-2 my-4" >
                        <div className='basis-3/4'>{todo.name}</div> 
                        <div className='flex gap-2'>
                        <button onClick={() => {doneTask(todo)}}><BsPatchCheckFill/> </button>
                        <Link to={`/editTodo/${todo.id}`}><button ><AiOutlineEdit/></button></Link> 
                        <button onClick={() => deleteTodo(todo.id)}><AiOutlineDelete/></button>
                        </div>
                    </div>
                    ))}
                </div> */}
      </div>
    </div>


  )
}