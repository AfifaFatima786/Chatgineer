import React from "react";
import axios from "../config/axios";

import { useNavigate } from "react-router-dom";

export const Logout=()=>{
    
    const navigate=useNavigate()
    // Always pass the string in localstorage methods  not a varibale 
   
    axios.get('/users/logout',{withCredentials:true}).then((response)=>{

        console.log(response.data)
        if(response.status==200){
            localStorage.removeItem('token');
            navigate('/login')
        }
    })



    return(
        <div>UserLogout</div>
    )
}

export default Logout