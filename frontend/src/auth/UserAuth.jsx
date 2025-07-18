import React,{useContext,useEffect,useState} from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import axios from "../config/axios"

function UserAuth({children}) {
    const {user,setUser}=useContext(UserContext)
    const [loading, setLoading] = useState(true)
    const token=localStorage.getItem('token')

    const navigate=useNavigate()

   


    useEffect(()=>{

        if(!token ){

            navigate('/login')
            
        }

        if (!user) {     
      axios
        .get('/users/profile', {
          withCredentials: true,
          
        })
        .then((res) => {
          setUser(res.data.user || res.data); // adjust based on API response
          setLoading(false);
        })
        .catch((err) => {
          console.error('User fetch failed:', err);
          navigate('/login');
        });
    } else {
      setLoading(false);
    }

        
    },[])

    
    if(loading){
        return <div>Loading...</div>
    }
 

  return (
    <>
    {children}
    </>
  )
}

export default UserAuth
