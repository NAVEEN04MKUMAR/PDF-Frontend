import React,{useState,useEffect} from "react";
import axios from "axios";



const Deletebranch=()=>{
    const [message,setmessage]=useState('');
    const [branches,setbranches]=useState([]);
    const [selectbranch,setselectbranch]=useState('');

    useEffect(()=>{
        axios.get('http://localhost:5002/api/getbranches')
        .then(response=>{

            console.log('Response from /api/getbranches:', response.data);
            setbranches(response.data.branches);
          console.log('get branch',response.data.branches);
          setselectbranch(response.data.branches[0]);
          console.log('get branch',response.data.activebranch[0]);
            
        }).catch(error=>{
            console.error('error fetching branches',error);
        });
    },[]);

  const handlechangebranch=(e)=>{
        setselectbranch(e.target.value);
        console.log("e.target.value",e.target.value);
    }


    const deletebranch=async(e)=>{
        e.preventDefault();
        console.log("Attempting to switch branch to:", selectbranch);
      try{
        console.log("Sending files to backend...");
          const res=await axios.post('http://localhost:5002/api/branch-delete/',{branchname:selectbranch});
          console.log('file response',res.data);
           setmessage(res.data.message);
           console.log('file message',res.data.message);
      }catch(error){
        console.error('Error commit file:', error.response ? error.response.data : error.message);
      }
      
  }
   

    return (
        <div>
        <h1>Version control system</h1>

        <h2>Delete-Branch</h2>
        <label htmlFor="deleting branchname">Branchname:</label>
        <form onSubmit={deletebranch}>
        <select
        id="branch-select"
        value={selectbranch}
        onChange={ handlechangebranch}
        >
        {
            branches.map((branch)=>(
                <option key={branch} value={branch}>{branch}</option>
            ))
        }
        </select>
<button type="submit">Delete branch</button>
        </form>
        {message&&<p>{message}</p>}
    </div>
    );
};



export default  Deletebranch;
