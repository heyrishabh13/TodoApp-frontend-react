import "./App.css";

import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EditTodo } from "./editTodo.jsx";
import { Home } from "./home";
import { Login } from "./login";
import { PrivateRoute } from "./privateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/editTodo/:id" element={<EditTodo />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
