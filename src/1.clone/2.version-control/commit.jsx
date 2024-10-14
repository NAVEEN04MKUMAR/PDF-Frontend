//uer input the repository name and description


import React,{useState,useEffect} from "react";
import axios from "axios";



const Commit=()=>{
    const [commitmessage,setcommitmessage]=useState('');
    const [commithistory,setcommithistory]=useState([]);
    const [selectedfile,setselectedfile]=useState(null);


//     const handlefilechange=(e)=>{
//       setselectedfile(e.target.files[0]);
// };

    const handlecommit=async()=>{
      const formdata=new FormData();
      formdata.append('file',selectedfile);
      formdata.append('file',commitmessage);

//when user hit page get the file and image showing all the commit history at that page
//then update the commit history 
      try{
        console.log("Sending files to backend...");
          const res=await axios.post('http://localhost:5002/api/file-commit/',formdata,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },});
          console.log('file response',res.data);
          // setrepositories(res.data.reposotory);
           console.log('file message',res.data.message);
           handlecommithistory();
      }catch(error){
        console.error('Error commit file:', error.response ? error.response.data : error.message);
      }
      
  }


  const handlecommithistory=async()=>{

    try{
      console.log("Sending files to backend...");
        const res=await axios.get('http://localhost:5002/api/file-commit-history/',
    );
        console.log('file response',res.data);
         setcommithistory(res.data);
        //  console.log('file message',res.data.message);
    }catch(error){
      console.error('Error commit-history file:', error.response ? error.response.data : error.message);
    }
    
}


useEffect(()=>{
    handlecommithistory();
})






   

    return (
        <div>
        <h1>Version control system</h1>

        <h2>Track file</h2>
        <input type="text" value={commitmessage} onChange={(e)=>setcommitmessage(e.target.value)}
        placeholder="commit message"/>
        <input type="file" accept=".jsx,.pdf,.html" onChange={(e)=>setselectedfile(e.target.files[0])}/> 
        <button type="button"  onClick={handlecommit} >commit changes</button>


<h3>commit history</h3>
<ul>
    {
        commithistory.map((commit,index)=>(
            <li key={index}>
                <strong>
                    {commit.message}
                </strong>
                (Hash:{commit.hash})
                <br/>
                Timestamp:{new Date(commit.timestamp).toLocaleString()}
            </li>
        ))}

</ul>


    </div>
    );
};



export default Commit;
