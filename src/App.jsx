import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routers from "./Routers/Routers";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
    <div className="App" >
      <Routers />
      <ToastContainer autoClose={ 1000 } />
    </div>
    </BrowserRouter>
  );
};

export default App;