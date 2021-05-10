import React from 'react';

import "bootswatch/dist/minty/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Header from './components/header';
import Productos from './components/Productos';

function App() {
  return (
    <>
      <Header />
      <div className="container p-4">
        <div className="row">
          <Productos />
        </div>
        <ToastContainer />
      </div>
    </>
  )

}

export default App;
