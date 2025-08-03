import React,{useContext,useState,useEffect} from 'react'
import { UserContext } from '../context/userContext'
import { RiLink } from "react-icons/ri";
import axios from '../config/axios'
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

import {useNavigate} from "react-router-dom"

function Home() {

  const {user}=useContext(UserContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectName,setProjectName]=useState('')
  const [project,setProject]=useState([])
  const navigate=useNavigate()

  function createProject(e){
    e.preventDefault()
    console.log({projectName})

    axios.post('/projects/create',{
      name:projectName
    },{
      withCredentials:true
    }).then((res)=>{
      console.log(res)
      setIsModalOpen(false)
      //setProject(prev => [...prev, res.data.project]);
      axios.get('/projects/all', { withCredentials: true })
      .then(res => setProject(res.data.projects))
      .catch(err => console.log(err))

    }).catch((error)=>{
      console.log(error)
    })
    
  }


  useEffect(()=>{
    axios.get('/projects/all',{
      withCredentials:true
    }).then((res)=>{
      console.log(res.data)
      setProject(res.data.projects)


    }).catch((err)=>{
      console.log(err)
    })

  },[])



  return (
    <main className='p-4 flex flex-col gap-4 bg-gray-900 h-screen'>
      <div className='flex justify-end'>
      <Link to='/logout'
      className=" cursor-pointer px-4 py-2 hover:bg-gray-100 hover:text-black font-semibold rounded-md shadow-sm hover:scale-105 bg-gray-900 transition-all duration-500 text-white"

      >Logout
      </Link>
      </div>

      <div className='projects flex flex-wrap gap-3'>

        <button
        onClick={()=>setIsModalOpen(true)}

        className='project flex items-center bg-gray-700 justify-center gap-2 p-4 border border-blue-200 rounded-md hover:scale-105 transition-all duration-500 text-gray-300'
        >
          New Project   
          <RiLink />

        
        </button>

        {
                    project.map((project) => (
                        <div key={project._id}

                            onClick={()=>{
                              navigate("/project",{
                                state:{project}
                              })
                            }}
                            


                            className="project flex flex-col gap-2 cursor-pointer p-4 border-2 border-gray-500 rounded-md min-w-52 bg-gray-700 text-gray-300 hover:bg-slate-200 hover:scale-105 transition-all duration-500 hover:text-black">
                            <h2
                                className='font-semibold'
                            >{project.name}</h2>

                            <div className="flex items-center  gap-2">
                              
                              <p><FaUser /></p>

                                <p className='text-sm'> Collaborators :</p>
                                {project.users.length}

                                <p><RiLink /></p>
                            </div>

                        </div>
                    ))
                }
        

      </div>


       {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-1/3">
                        <h2 className=" text-xl mb-4">Create New Project</h2>
                        <form onSubmit={createProject}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                                <input

                                onChange={(e)=>setProjectName(e.target.value)}
                                    value={projectName}
                                    
                                    type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" className=" cursor-pointer mr-2 px-4 py-2 bg-gray-300 rounded-md" 
                                
                                onClick={()=>setIsModalOpen(false)}
                               
                                >Cancel</button>
                                <button type="submit" className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-md">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
      
    </main>
  )
}

export default Home