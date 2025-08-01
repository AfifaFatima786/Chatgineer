import { useState,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../config/axios'
import { UserContext } from '../context/userContext'

const Register = () => {
    const navigate=useNavigate()
    const {setUser}=useContext(UserContext)

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    function submitHandler(e){

        e.preventDefault()

        axios.post('/users/register', {
         email,
         password
            }, {
        withCredentials: true 
        })
            .then((res) => {
        console.log(res.data);

        localStorage.setItem('token',res.data.token)
        setUser(res.data.user)
        navigate('/');
        })
    .catch((err) => {
        if (err.response) {
            // Server responded with error status
            console.log(err.response.data);
        } else if (err.request) {
            // Request was made but no response received (server not running)
            console.log('Server is not running. Please start the backend server.');
        } else {
            // Something else happened
            console.log('Error:', err.message);
        }
    });


    }




    return (

        



        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-6">Register</h2>
                <form
                onSubmit={submitHandler}
                    
                >
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
                        <input
                        onChange={(e)=>setEmail(e.target.value)}

                           
                            type="email"
                            id="email"
                            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
                        <input

                        onChange={(e)=>setPassword(e.target.value)}
                           
                            type="password"
                            id="password"
                            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Register
                    </button>
                </form>
                <p className="text-gray-400 mt-4">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register