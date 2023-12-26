import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import Register from './components/Register.js';
import Edit from './components/Edit.js';
import Detail from './components/Detail.js';
import {Route, Routes} from 'react-router-dom'

const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/edit/:id' element={<Edit/>} />
      <Route path='/view/:id' element={<Detail/>} />
    </Routes>
    </>
  )
}

export default App