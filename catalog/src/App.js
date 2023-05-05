import "./App.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes } from "react-router-dom";
import Main from "./Pages/Main";
import Admin from "./Pages/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/record" />
      <Route path="/upload" />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
