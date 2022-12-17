import axios from "axios";
import { useState, useEffect } from "react";
import { Utility } from "./utility";

export const DisplayDescription = ({ id }) => {
  const [task, setTask] = useState("");
  const [des, setDes] = useState("");
  const token = Utility();

  useEffect(() => {
    getTodo(id);
  }, [id]);

  async function getTodo(id) {
    try {
      // axios GET request
      const options = {
        url: `http://localhost:8080/api/todo-controller/get-todo/${id}`,
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      };
      const response = await axios(options);
      // console.log(response.data, "Display Description data")
      setTask(response.data.name);
      setDes(response.data.description);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div className="">
        <h1 className="text-white text-center text-xl pt-8">Task Details</h1>
        <div className="flex justify-evenly text-white px-2 my-4">
          {/* <p className="py-2 underline">Name : </p> */}
          <p className="py-2 border-2 rounded-lg px-4 ml-4">{task}</p>
        </div>
        <div className="flex justify-evenly text-white px-2 my-4">
          {/* <p className="py-2 underline">Description: </p> */}
          <p className="py-2 border-2 rounded-lg px-4 ml-4">{des}</p>
        </div>
      </div>
    </div>
  );
};
