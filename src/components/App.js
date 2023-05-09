import React, { Component } from "react";
// import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { BrowserRouter,HashRouter,createHashRouter, Routes, Route } from 'react-router-dom';
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import RegisterUser from "../pages/RegisterUser";
import UpdatePassword from "../pages/UpdatePassword";
import VerifyEmail from "../pages/VerifyEmail";



const App=()=>{
    return (
      <HashRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<RegisterUser/>}/>
          <Route path="/verify-email" element={<VerifyEmail/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/update-password" element={<UpdatePassword/>}/>
        </Routes>
      </HashRouter>
      )
}

export default App;