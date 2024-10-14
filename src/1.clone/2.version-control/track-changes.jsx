//uer input the repository name and description


import React,{useState,useEffect} from "react";
import axios from "axios";

const Trcakchanges=()=>{
    const [selectedfile,setselectedfile]=useState(null);
    // const [commitmessage,setscommitmessage]=useState('');
    // const [commithistory,setcommithistory]=useState([]);


    const handlefilechange=(e)=>{
      setselectedfile(e.target.files[0]);
};

    const handleupload=async()=>{
      const formdata=new FormData();
      formdata.append('file',selectedfile);

      try{
        console.log("Sending files to backend...");
          const res=await axios.post('http://localhost:5002/api/file-upload/',
            formdata,{
            headers:{
              "Content-type":"multipart/form-data",
            }
            // { withCredentials: true}
      });
          console.log('file response',res.data);
          // setrepositories(res.data.reposotory);
           console.log('file message',res.data.message);
      }catch(error){
        console.error('Error file-upload repository:', error.response ? error.response.data : error.message);
      }
      
  }

   

    return (
        <div>
        <h1>Version control system</h1>

        <h2>Track file</h2>
        <input type="file" accept=".jsx,.pdf,.html" onChange={handlefilechange}/>
        <button type="button"  onClick={handleupload} >Upload-file</button>


    </div>
    );
};



export default Trcakchanges;
