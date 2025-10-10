import axios from 'axios'

const axiosInstace=axios.create({
    baseURL:import.meta.env.VITE_API_PATH,
})

export default axiosInstace