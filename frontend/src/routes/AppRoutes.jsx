import React from 'react'
import {Route,BrowserRouter,Routes} from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Home from '../screens/Home'
import Project from '../screens/Project'
import UserAuth from '../auth/UserAuth'
import Logout from '../screens/Logout'

import { ToastContainer, toast } from 'react-toastify';
  



function AppRoutes() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<UserAuth> <Home/>  </UserAuth>} />
         <Route path="/login" element={<Login/>} />

        <Route path="/register" element={<Register/>} />

        <Route path="/logout" element={<Logout/>} />

        <Route path="/project" element={<UserAuth>  <Project/> </UserAuth>} />



    </Routes>
    <ToastContainer />
 
     
    </BrowserRouter>
  )
}

export default AppRoutes