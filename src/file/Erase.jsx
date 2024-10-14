

import React,{useState} from "react";
import axios from "axios";

const Erase=()=>{
    const [selectedfiles,setselectedfiles]=useState(null);
    const [message,setmessage]=useState('');

    const handlefilechange=(e)=>{
        setselectedfiles(e.target.files);
        console.log(e.target.files);
    }
   

    const handleeraseannotation=async(e)=>{
        e.preventDefault(); 
     if(!selectedfiles){
        setmessage('please select file')
        return;
     }
   
      const formdata=new FormData();
      if(selectedfiles){   
      for(let i=0;i<selectedfiles.length;i++){
          formdata.append('file',selectedfiles[i]);
          console.log('submitted file',selectedfiles[i]);    
      }   
    }



      try{
        console.log("Sending files to backend...");
          const res=await axios.post('http://localhost:5002/api/erase-pdf/',formdata,{
              headers:{
                 'Content-Type':'multipart/form-data',
              }
          });
          console.log('annotation response',res.data)
          setmessage(res.data.annotationerasefilepath);
          console.log('annotationtext file url',res.data.annotationerasefilepath);
      }catch(error){
          console.log('error annotationhighlight file',error);
      }
      
  }

   

    return (
        <div>
        <h1>annotation-highlight-PDF</h1>
            <form onSubmit={handleeraseannotation}>
<input type="file" name="file"  onChange={handlefilechange} accept="application/pdf"/>
<button type="button"  onClick={handleeraseannotation} >Annotationdata</button>
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
            {message && <p>{message}</p>}
    </div>
    );
};



export default Erase;
