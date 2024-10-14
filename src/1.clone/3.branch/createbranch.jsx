//uer input the repository name and description


import React,{useState,useEffect} from "react";
import axios from "axios";



const Createbranch=()=>{
    const [message,setmessage]=useState('');
    const [branchname,setbranchname]=useState('');

    const handlecreatebranch=async(e)=>{
        e.preventDefault();
      try{
        console.log("Sending files to backend...");
          const res=await axios.post('http://localhost:5002/api/branch-create/',{branchname});
          console.log('file response',res.data);
           setmessage(res.data.message);
           console.log('file message',res.data.message);
           setbranchname('');
      }catch(error){
        console.error('Error commit file:', error.response ? error.response.data : error.message);
      }
      
  }
   

    return (
        <div>
        <h1>Version control system</h1>

        <h2>Create-Branch</h2>
        <label htmlFor="branchname">Branchname:</label>
        <form onSubmit={handlecreatebranch}>
        <input 
        type="text" 
        id="branchname"
        value={branchname}
        onChange={(e)=>setbranchname(e.target.value)}
        placeholder="enter branch name"/>
<button type="submit">create branch</button>
        </form>
        {message&<p>{message}</p>}
    </div>
    );
};



export default Createbranch;
