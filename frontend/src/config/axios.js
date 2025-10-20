import axios from 'axios'

console.log('API Base URL:', import.meta.env.VITE_API_PATH) 
const axiosInstace=axios.create({
    baseURL:import.meta.env.VITE_API_PATH,
    withCredentials:true
})


export default axiosInstace

