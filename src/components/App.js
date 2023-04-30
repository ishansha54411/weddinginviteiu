import React, { Component } from "react";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import RegisterUser from "../pages/RegisterUser";
import UpdatePassword from "../pages/UpdatePassword";
import VerifyEmail from "../pages/VerifyEmail";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/register",
      element:<RegisterUser/>
    },
    {
      path:"/verify-email",
      element:<VerifyEmail/>
    },
    {
      path:'/forgot-password',
      element:<ForgotPassword/>
    },
    {
      path:'/update-password',
      element:<UpdatePassword/>
    }
  ]);
  
const App=()=>{
    // return (
    //     <RouterProvider router={router} />
    //   )
    return (<div>hi</div>>)
}

export default App;