//uer input the repository name and description


import React,{useState} from "react";
import axios from "axios";

const Createrepo=()=>{
    const [reponame,setreponame]=useState('');
    const [description,setdescription]=useState(''); 
    const [repapath,setrepopath]=useState(''); 

    const handlecreate=async(e)=>{
e.preventDefault();
      try{
        console.log("Sending files to backend...");
          const res=await axios.post('http://localhost:5002/api/create-repo/',{reponame,description}
            // { withCredentials: true}
);
          console.log('repository response',res.data);
          setrepopath(res.data.repopath);
          console.log('repopath',res.data.repopath);
      }catch(error){
        console.error('Error creating repository:', error.response ? error.response.data : error.message);
      }
      
  }

   

    return (
        <div>
        <h1>Create repository</h1>
            <form onSubmit={handlecreate}>
<input type="text" placeholder="repository name" value={reponame} onChange={(e)=>setreponame(e.target.value)}/>
<input type="text" placeholder="description" value={description} onChange={(e)=>setdescription(e.target.value)}/>

<button type="button"  onClick={handlecreate} >Create</button>
            </form>


{/* 
<h4>Annotation items:</h4>
<ul>
    {
        redactionitems.map((item,index)=>(
            <li key={index}>{item}</li>
        ))
    }
</ul> */}
    </div>
    );
};



export default Createrepo;
