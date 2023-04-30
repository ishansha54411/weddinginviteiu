import React from "react";
import ReactDOM from 'react-dom/client'
import App from "./components/App";
import {Provider} from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {store} from './store'
const root = ReactDOM.createRoot(document.getElementById("page"));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
      <App/>
    </React.StrictMode>
  </Provider>
  
);