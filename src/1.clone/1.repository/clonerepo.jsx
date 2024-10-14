//clone:mean we copy the file,from the server to local system that is th clone
//here where we create the repo to we send the all the file to our desired location


import React,{useState} from "react";
import axios from "axios";

const Clonerepo=()=>{
    const [repoURL,setrepoURL]=useState('');
    const [desiredpath,setdesiredpath]=useState(''); 
    const [destinationpath, setdestinationpath] = useState('');
    const handleclone=async(e)=>{
        e.preventDefault();

      try{
        console.log("Sending files to backend...");
          const res=await axios.post('http://localhost:5002/api/clone-repo/',{repoURL,desiredpath}
            // { withCredentials: true}
);
console.log('repository response',res.data);
setdestinationpath(res.data.destinationpath);
console.log('repopath',res.data.destinationpath);

          console.log('repository response',res.data)
      }catch(error){
        console.error('Error clone repository:', error.response ? error.response.data : error.message);
      }
      
  }

   

    return (
        <div>
        <h1>Clone repository</h1>
            <form onSubmit={handleclone}>
<input type="text" placeholder="enter repo url" value={repoURL} onChange={(e)=>setrepoURL(e.target.value)}/>
<input type="text"  placeholder="enter desired path" value={desiredpath} onChange={(e)=>setdesiredpath(e.target.value)}/>
<button type="submit">clone</button>
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



export default Clonerepo;
