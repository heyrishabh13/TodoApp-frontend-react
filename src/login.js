import { ImCross } from "react-icons/im";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Home } from "./home";
import { Utility } from "./utility";
import { Navigate, useNavigate } from "react-router-dom";

export const Login = () => {
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const token = Utility();
  const navigate = useNavigate();

  // const navigate = useNavigate();

  function handleName(e) {
    setName(e.target.value);
  }

  function handlePwd(e) {
    setPwd(e.target.value);
  }

  async function saveCredentials() {
    try {
      // axios POST request
      const options = {
        url: "http://localhost:8080/api/authenticate",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTY3MTIxNzk4Nn0.kNQgU9HqCFtUTZ9DcYxcMytRGjcfxM0rg7S0mqZW-jsOSDrj8R4uboQrNVZWjYv5l4Y8lWYeG9tptPHyxadZRQ`,
          "Access-Control-Allow-Origin": "*",
        },
        data: { username: name, password: pwd, rememberMe: true },
      };

      const response = await axios(options);
      localStorage.setItem("token", response.data.id_token);
      const token = localStorage.getItem("token");

      if (token) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {token && token.length > 1 ? (
        <Navigate to={"/"} />
      ) : (
        <div className="w-1/4 bg-[rgb(15,23,42)] m-auto mt-12 pb-12 rounded-lg px-4 text-white pt-8">
          <div className="flex justify-between">
            <h1 className="text-xl">Sign in</h1>
            <span>
              <ImCross />
            </span>
          </div>
          <hr className="mt-4"></hr>
          <div className="flex flex-col mt-4 gap-4">
            <input
              className="rounded p-2 bg-black text-white"
              placeholder="Username"
              onKeyDown={handleName}
            ></input>
            <input
              className="rounded p-2 bg-black text-white"
              placeholder="Password"
              type="password"
              onKeyDown={handlePwd}
            ></input>
            {/* <checkbox>Remember me</checkbox> */}
          </div>
          <hr className="mt-4"></hr>
          <div className="flex justify-end mt-4 gap-4">
            <button className="border-2 border-orange-500 hover:bg-orange-500 px-4 py-2 rounded-lg text-white">
              Cancel
            </button>
            <button
              className="border-2 border-orange-500 hover:bg-orange-500 px-4 py-2 rounded-lg text-white"
              onClick={() => saveCredentials()}
            >
              Sign in
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
