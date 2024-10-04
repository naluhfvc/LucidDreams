import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/Login" element={<LoginPage/>} />
      </Routes>
    </>
  )
}

export default App;
