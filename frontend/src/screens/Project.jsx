import React,{useState ,useEffect,useContext ,useRef} from 'react'

import { useLocation} from 'react-router-dom'
import { TiGroup } from "react-icons/ti";
import { IoIosSend } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import axios from '../config/axios';
import { initialiseSocket,sendMessage,receiveMessage, disconnectSocket } from '../config/socket';
import { UserContext } from '../context/userContext';
import Markdown from 'markdown-to-jsx'
import hljs from 'highlight.js';
import 'highlight.js/styles/nord.css'; 
import Compiler from './Compiler';

import { Link } from 'react-router-dom';



function Project() {

    if (!window.hljs) window.hljs = hljs;


    const location=useLocation()
    

    const [isSidePanelOpen,setIsSidePanelOpen]=useState(false)
    const [isModalOpen,setIsModalOpen]=useState(false)
    const [selectedUserId, setSelectedUserId] = useState([]);
    const [users, setUsers] = useState([])
    const [project, setProject] = useState(location.state.project)
    const [message,setMessage]=useState('')
    const {user}=useContext(UserContext)
    const messageBox=useRef(null)
    const [messages, setMessages] = useState([])
//     const [stdin, setStdin] = useState("");
    const [showCompiler, setShowCompiler] = useState(false);
//   const [code, setCode] = useState("print('Hello')");
//   const [language, setLanguage] = useState("python3");
//   const [output, setOutput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const versionIndexMap = {
//     python3: "4",
//     java: "4",
//     cpp17: "0",
//     c: "5"
//   };

//   const runCode = async (currentStdin) => {
//     setLoading(true);
//     try {
//       const res = await axios.post('http://localhost:3000/execute', {
//         script: code,
//         language: language,
//         versionIndex: versionIndexMap[language],
//         stdin: currentStdin,
        
//       });
//       setOutput(res.data.output);
//     } catch (err) {
//       setOutput("Error executing code.");
//       console.error(err);
//     }
//     setLoading(false);
//   };




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
            if (err.response) {
                console.log(err.response.data);
            } else if (err.request) {
                console.log('Server is not running. Please start the backend server.');
            } else {
                console.log('Error:', err.message);
            }
        })
    }

    const send=()=>{
        console.log(user)
        console.log(user._id)

        const messageData = {
            message,
            sender: user,
            timestamp: Date.now(), // Add timestamp for unique identification
            id: Math.random().toString(36).substr(2, 9) // Add unique ID
        }

        sendMessage('project-message', messageData)

        // Add message to local state immediately for instant feedback
        setMessages(prevMessages => [...prevMessages, messageData])
        
        // Clear the input field immediately for better UX
        setMessage('')

    }

    
    function getAllCodeBlocks() {
        const allCodeBlocks = [];
        
        
        const aiMessages = messages.filter(msg => msg.sender._id === 'ai');
        const latestAiMessage = aiMessages[aiMessages.length - 1];
        
        if (latestAiMessage) {
            const parts = latestAiMessage.message.split(/(```[\s\S]*?```)/);
            
            parts.forEach((part) => {
                if (part.startsWith('```') && part.endsWith('```')) {
                    const codeContent = part.slice(3, -3);
                    const lines = codeContent.split('\n');
                    const language = lines[0].trim();
                    const actualCode = lines.slice(1).join('\n');
                    
                    allCodeBlocks.push({
                        language: language || 'javascript',
                        code: actualCode,
                        sender: latestAiMessage.sender.email,
                        timestamp: latestAiMessage.timestamp || Date.now()
                    });
                }
            });
        }
        
        return allCodeBlocks;
    }

    function WriteAiMessage({messageObject}) {
        return (
            <div className="bg-slate-50 text-black rounded-sm p-2">
                <Markdown
                    children={messageObject}
                    options={{
                        overrides: {
                            
                            code: () => null,
                            pre: () => null,
                        },
                    }}
                />
            </div>
        )
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
            if (err.response) {
                console.log(err.response.data);
            } else if (err.request) {
                console.log('Server is not running. Please start the backend server.');
            } else {
                console.log('Error:', err.message);
            }
        })

        

    },[])

    
    


    useEffect(() => {
    
    initialiseSocket(project._id);

    const messageListener = (data) => {
        console.log(data)

        if (data.sender._id == 'ai') {
            console.log(data.message)
            setMessages(prevMessages => [ ...prevMessages, data ]) 
        } else {
            
            setMessages(prevMessages => {
                
                if (data.id && prevMessages.some(msg => msg.id === data.id)) {
                    return prevMessages;
                }
                return [...prevMessages, data];
            });
        }
    };

    const cleanup = receiveMessage('project-message', messageListener);

    return () => {
        cleanup(); 
    };

}, [project._id]);


    useEffect(() => {
    return () => {
        disconnectSocket();
    };
}, []);




    function scrollToBottom(){
        messageBox.current.scrollTop=messageBox.current.scrollHeight
    }

    useEffect(() => {
  scrollToBottom();
}, [messages]);

    // Apply syntax highlighting to code blocks in right section
    useEffect(() => {
        if (window.hljs) {
            document.querySelectorAll('.right pre code').forEach((block) => {
                window.hljs.highlightElement(block);
            });
        }
    }, [messages]);


    
      return (
    <main className='h-screen overflow-hidden w-screen flex'>

        {/* Left Section - Chat Messages */}
        <section className='left flex flex-col h-full w-3/5 bg-gray-200'>
                         
            <header className='flex items-center   justify-between p-2 px-4 w-full bg-slate-400'>
                

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



                <div className='conversation-area relative flex-grow flex flex-col overflow-hidden'>
  <div
    ref={messageBox}
    className="message-box flex-grow overflow-y-auto flex flex-col gap-2 px-3 py-2 max-h-full scrollbar-hide "
  >
    {messages.map((msg, index) => (
      <div
        key={index}
        className={`${msg.sender._id === 'ai' ? 'max-w-70' : 'max-w-52'} ${
          msg.sender._id === user._id?.toString() && 'ml-auto'
        } message flex flex-col p-2 bg-slate-50 w-fit rounded-md`}
      >
        <small className='opacity-65 text-xs'>{msg.sender.email}</small>
        <div className='text-sm'>
          {msg.sender._id === 'ai' ? (

          
        
            // <Markdown className="break-words whitespace-pre-wrap overflow-auto break-word break-all bg-slate-950 text-white p-2 border-2 rounded-lg">{msg.message}</Markdown>

            <WriteAiMessage messageObject={msg.message} />
          ) : (
            <p className="break-words  whitespace-pre-wrap">{msg.message}</p>
          )}
        </div>
      </div>
    ))}
  </div>

  {/* Input Box Fixed at Bottom */}
  <div className='input-field w-full flex items-center p-2 bg-gray-200'>
    <input
      className='p-2 px-4 border-none outline-none w-full bg-gray-300 rounded-md'
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder='Enter message'
    />
    <button onClick={send} className='ml-2 text-white bg-gray-950 p-2 rounded'>
      <IoIosSend size={24} />
    </button>
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

        <section className='right bg-silver-50 w-3/5 h-full flex flex-col p-4'>

        <div className='flex justify-between w-full'>

            <Link
  to='/'
   className=" cursor-pointer px-4 py-2 hover:bg-gray-100 hover:text-black font-semibold rounded-md shadow-sm hover:scale-105 bg-gray-900 transition-all duration-500 text-white"

>
  Home
</Link>


        <button
  onClick={() => setShowCompiler(true)}
   className="ml-auto cursor-pointer px-4 py-2 hover:bg-gray-100 hover:text-black font-semibold rounded-md shadow-sm hover:scale-105 bg-gray-900 transition-all duration-500 text-white"

>
  Open Compiler
</button>
</div>

            <div className='flex-grow overflow-y-auto p-3'>
                {getAllCodeBlocks().map((block, index) => (
                    <div key={index} className='mb-4 last:mb-0'>
                        <div className='text-xs text-silver-600 mb-2'>
                            {block.language}
                        </div>
                        <div className='bg-white rounded-sm p-3 border border-silver-600'>
                            <pre className={`language-${block.language}`}>
                                <code className={`language-${block.language}`}>
                                    {block.code}
                                </code>
                            </pre>
                        </div>
                    </div>
                ))}
            </div>



            <section className='right bg-silver-50  h-full flex flex-row'>

{/*   
  <div className='w-1/2 p-3 border-r border-slate-300 flex flex-col'>
    <h2 className='text-md font-semibold mb-2'>Chatgineer-Mini Compiler</h2>

    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className='p-2 mb-2 border rounded-md'
    >
      <option value="python3">Python 3</option>
      <option value="java">Java</option>
      <option value="cpp17">C++17</option>
      <option value="c">C</option>
    </select>

    <textarea
      className='flex-grow p-2 border rounded-md resize-none'
      rows={10}
      value={code}
      onChange={(e) => setCode(e.target.value)}
      placeholder='Write your code here...'
    />

    <textarea
        className="w-full p-2 border rounded-md resize-none mb-4"
        rows={3}
        value={stdin}
        onChange={(e) => setStdin(e.target.value)}
        placeholder="Enter input (stdin) here..."
      />

    <button
      onClick={() => runCode(stdin)}
      className='mt-2 p-2 bg-black text-white rounded-md hover:bg-gray-800'
      disabled={loading}
    >
      {loading ? "Running..." : "Run Code"}
    </button>

    <div className='mt-4'>
      <h3 className='text-sm font-semibold mb-1'>Output:</h3>
      <pre className='bg-gray-100 p-2 rounded-md text-sm whitespace-pre-wrap'>
        {output}
      </pre>
    </div>
  </div> */}

  {/* 🔸 Code Output Section */}
  <div className='w-full p-3 overflow-y-auto'>
    {getAllCodeBlocks().map((block, index) => (
      <div key={index} className='mb-4 last:mb-0'>
        <div className='text-xs text-silver-600 mb-2'>{block.language}</div>
        <div className='bg-white rounded-sm p-3 border border-silver-600'>
          <pre className={`language-${block.language}`}>
            <code className={`language-${block.language}`}>{block.code}</code>
          </pre>
        </div>
      </div>
    ))}
  </div>

</section>

        </section>



        {showCompiler && <Compiler setShowCompiler={setShowCompiler} />}


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