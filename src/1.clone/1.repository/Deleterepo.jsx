//uer input the repository name and description


import React,{useState,useEffect} from "react";
import axios from "axios";

const Deleterepo=()=>{
    const [repositories,setrepositories]=useState([]);
   
    const handleget=async()=>{
      try{
        console.log("Sending files to backend...");
          const res=await axios.get('http://localhost:5002/api/get-repo/'
            // { withCredentials: true}
);
          console.log('repository response',res.data);
          setrepositories(res.data.reposotory);
        //   console.log('repositories',res.data.repositories);
      }catch(error){
        console.error('Error get repository:', error.response ? error.response.data : error.message);
      }
      
  }
  useEffect(()=>{
    handleget();
  },[]);

  
  const handledelete=async(reponame)=>{
   const confirmdelete=window.confirm(`are you sure way to delete the repo ${reponame}?`);
   if(confirmdelete){
    try{
        console.log("Sending files to backend...");
          const res=await axios.delete(`http://localhost:5002/api/delete-repo/${reponame}`
            // { withCredentials: true}
);
          console.log('repository response',res.data);
          console.log('repositories',res.data.message);
          handleget();
      }catch(error){
        console.error('Error delete repository:', error.response ? error.response.data : error.message);
      }


   }      
          
      }
    

   

    return (
        <div>
        <h1>repository</h1>

<ul>
{repositories.length>0?(
    repositories.map(repo=>(
        <li key={repo}>
            {repo}
            <button type="button"  onClick={()=>handledelete(repo)} >Delete</button>
        </li>
    ))
):(
<p>No repo available</p>
)

}
</ul>

    </div>
    );
};



export default Deleterepo;
