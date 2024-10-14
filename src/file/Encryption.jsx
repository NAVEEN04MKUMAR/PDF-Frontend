import React,{useState} from "react";
import axios from "axios";

const Encryption=()=>{
    const [selectedfiles,setselectedfiles]=useState(null);
    const [uploadstatus,setuploadstatus]=useState(null);


    const handlefilechange=(e)=>{
        setselectedfiles(e.target.files);
        console.log(e.target.files);
    }


    const handleencrypt=async(e)=>{
      e.preventDefault();
   
      const formdata=new FormData();
      if(selectedfiles){   
      for(let i=0;i<selectedfiles.length;i++){
          formdata.append('file',selectedfiles[i]);
          console.log('submitted file',selectedfiles[i]);    
      }
    }

      try{
        console.log("Sending files to backend...");
          const res=await axios.post('http://localhost:5002/api/encrypt-pdf/',formdata,{
              headers:{
                 'Content-Type':'multipart/form-data',
              }
          });
          console.log('encrypt response',res.data)
          setuploadstatus(res.data.com);
          console.log('encrypted file url',res.data.encryptedfilepath);;
      }catch(error){
          console.log('error encrypted file',error);
      }
      
  }

   

    return (
        <div>
        <h1>Encrypt PDF</h1>
            <form onSubmit={handleencrypt}>
<input type="file" name="file"  onChange={handlefilechange} accept="application/pdf"/>
<button type="submit">Encrypt</button>
            </form>

            {uploadstatus && <p>{uploadstatus}</p>}
    </div>
    );
};



export default Encryption;
