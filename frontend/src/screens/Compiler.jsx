import React from 'react'
import { useState } from 'react';
import axios from 'axios';

function Compiler(props) {


    const [stdin, setStdin] = useState("");
    
      const [code, setCode] = useState("print('Hello')");
      const [language, setLanguage] = useState("python3");
      const [output, setOutput] = useState("");
      const [loading, setLoading] = useState(false);
    
      const versionIndexMap = {
        python3: "4",
        java: "4",
        cpp17: "0",
        c: "5"
      };
    
      const runCode = async (currentStdin) => {
        setLoading(true);
        try {
          const res = await axios.post('http://localhost:3000/execute', {
            script: code,
            language: language,
            versionIndex: versionIndexMap[language],
            stdin: currentStdin,
            
          });
          setOutput(res.data.output);
        } catch (err) {
          setOutput("Error executing code.");
          console.error(err);
        }
        setLoading(false);
      };



  return (
   



  
    <div className="fixed text-gray-200 inset-0 bg-gray-800 z-50 p-4 overflow-auto">
      <button
       
       onClick={()=>{
                    props.setShowCompiler(false)
            
                    }}
        className="absolute top-4 right-4 text-2xl cursor-pointer">×</button>

      <div className='w-full max-w-5xl mx-auto p-4'>
        <h2 className="text-2xl font-extrabold text-gray-200 mb-6 tracking-wide border-b pb-2 border-gray-300">
  Chatgineer — Mini Compiler
</h2>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className='p-2 mb-2 border rounded-md'
          
        >
          <option  className='border-2 border-amber-800' value="python3">Python 3</option>
          <option value="java">Java</option>
          <option value="cpp17">C++17</option>
          <option value="c">C</option>
        </select>

        <textarea
          className='w-full p-2 border rounded-md resize-none mb-2'
          rows={10}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder='Write your code here...'
        />

        <textarea
          className="w-full p-2  text-gray-100 border rounded-md resize-none mb-4"
          rows={3}
          value={stdin}
          onChange={(e) => setStdin(e.target.value)}
          placeholder="Enter input here..."
        />
        

        <button
         onClick={()=>runCode(stdin)}
          className='p-2 bg-black hover:scale-105 transition-all duration-500 cursor-pointer hover:bg-gray-200 text-white rounded-md hover:text-black'
          disabled={loading}
        >
          {loading ? "Running..." : "Run Code"}
        </button>

        <div className='mt-4'>
          <h3 className='text-md font-semibold mb-1'>Output:</h3>
          <pre className='bg-gray-700 p-3 rounded-md text-sm whitespace-pre-wrap'>
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}


export default Compiler