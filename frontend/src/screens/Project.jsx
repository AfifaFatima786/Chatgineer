import React,{useState ,useEffect} from 'react'
import { useLocation} from 'react-router-dom'
import { TiGroup } from "react-icons/ti";
import { IoIosSend } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import axios from '../config/axios';

function Project() {

    const location=useLocation()

    const [isSidePanelOpen,setIsSidePanelOpen]=useState(false)
    const [isModalOpen,setIsModalOpen]=useState(false)
    const [selectedUserId, setSelectedUserId] = useState([]);
    const [users, setUsers] = useState([])
    const [project, setProject] = useState(location.state.project)


    console.log(users)
    console.log(users._id)

    

    const handleUserClick=(id)=>{
       setSelectedUserId(prevSelectedUserId=>{
        const newSelectedUserId=new Set(prevSelectedUserId)
        if(newSelectedUserId.has(id)){
            newSelectedUserId.delete(id)
        }else{
            newSelectedUserId.add(id)
        }
        console.log(newSelectedUserId)
        return newSelectedUserId
       })
    }

    function addCollaborators(){
        Array.from(selectedUserId),

        console.log(location.state.project._id)
        axios.put("/projects/add-user",{
            projectId:location.state.project._id,
            users: Array.from(selectedUserId),
        },{
            withCredentials:true
        }
        ).then(res=>{
            console.log(res.data)
            setIsModalOpen(false)
        }).catch(err=>{
            console.log(err)
        })
    }


    useEffect(()=>{

        axios.get(`/projects/get-project/${location.state.project._id}`,{
            withCredentials:true
        }).then(res =>{

            
            setProject(res.data.project)

        })




        axios.get('/users/all',{
            withCredentials:true
        }).then(res=>{
            setUsers(res.data.allUsers)
            console.log(res.data.allUsers)
        }).catch(err=>{
            console.log(err)
        })

        

    },[])

    
  return (
    <main className='h-screen w-screen flex '>

        <section className='left flex flex-col  h-full min-w-90 bg-gray-200'>
                         
            <header className='flex items-center  justify-between p-2 px-4 w-full bg-slate-400'>
                

                <button 
                onClick={()=>setIsModalOpen(true)}
                className='flex gap-2 justify-center cursor-pointer items-center'>

                    <IoMdPersonAdd />
                    <p>Add Collaborators</p>

                </button>

                <button
                onClick={()=>setIsSidePanelOpen(!isSidePanelOpen)}
                 className='p-2 cursor-pointer'>
                <TiGroup size={25}/>
                </button>

            </header>




            <div className='conversation-area relative flex-grow flex flex-col'>

                <div className='message-box p-2 flex flex-col flex-grow gap-3'>

                    <div className='incoming flex p-2 bg-slate-50 w-fit rounded-md flex-col'>
                        <small className='opacity-65 text-sm'>example@gmail.com</small> <p className='text-sm max-w-56'>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel.</p>
                     </div>

                     <div className='ml-auto flex p-2 bg-slate-50 w-fit rounded-md flex-col'>
                        <small className='opacity-65 text-sm'>example@gmail.com</small> <p className='text-sm max-w-56 '>Lorem ipsum dolor sit amet.</p>
                     </div>




                    </div>




                    <div className='input-field  bottom-0 w-full absolute flex items-center '>

                        <input className='p-2 px-7 border-none outline-none w-[80%] bg-gray-300' type="text" placeholder='Enter message'/>

                        <button className='cursor-pointer text-white bg-gray-950  p-2 px-5'><IoIosSend size={27} /></button>

                    
                </div>
            </div>


            <div className={`sidePanel absolute h-full flex flex-col gap-2 bg-slate-50 min-w-80 transition-all ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'} top-0`}>

                <header className='flex justify-between items-center p-3 bg-gray-300 px-3'>

                    <h1 className='font-semibold text-lg'>Collaborators</h1>

                    <button onClick={()=>setIsSidePanelOpen(false)}>
                        <RxCross2 size={15}/>
                    </button>
                </header>

               
               
                

                <div className='users flex flex-col gap-2'>
  

  {project.users && project.users.map(user => {


                            return (
                                <div
                                key={user._id || user}
                                 className="user cursor-pointer hover:bg-slate-200 p-2 flex gap-2 items-center">
                                    <div className='aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                       <FaUser />
                                    </div>
                                    <h1 className='font-semibold text-lg'>{user.email}</h1>
                                </div>
                            )


                        })}

</div>



            </div>



        </section>

        {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
                        <header className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-semibold'>Select User</h2>
                            <button onClick={() => setIsModalOpen(false)} className='p-2 cursor-pointer'>

                                 <RxCross2 size={15}/>
                                
                            </button>
                        </header>
                        <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
                            {users.map(user => (
                                <div key={user._id} className={`user cursor-pointer hover:bg-slate-200
                                    ${Array.from(selectedUserId).indexOf(user._id) != -1 ? 'bg-slate-200' : ""}
                                 p-2 flex gap-2 items-center`} onClick={() => handleUserClick(user._id)}>
                                    <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                       <FaUser />
                                    </div>
                                    <h1 className='font-semibold text-lg'>{user.email}</h1>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={addCollaborators}
                            className='absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md'>
                            Add Collaborators
                        </button>
                    </div>
                </div>
            )}



        

</main>
  )}

export default Project