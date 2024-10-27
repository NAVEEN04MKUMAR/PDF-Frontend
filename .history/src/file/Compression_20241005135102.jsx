import React,{useState} from "react";
import axios from "axios";

const Compression=()=>{
    const [selectedfiles,setselectedfiles]=useState(null);
    const [compressedurl,setcompressedurl]=useState('');
    const [loading,setloading]=useState('');


    const handlefilechange=(e)=>{
        setselectedfiles(e.target.files);
        console.log(e.target.files);
    }


    const handlecompress=async(e)=>{
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
          const res=await axios.post('http://localhost:5002/compress-pdf/',formdata,{
              headers:{
                 'Content-Type':'multipart/form-data',
              }
          });
          console.log('compression response',res.data)
          setcompressedurl(res.data.compressedfilepath);
          console.log('compressed file url',res.data.compressedfilepath);;
      }catch(error){
          console.log('error compressing file',error);
      }
      
  }

   

    return (
        <div>
        <h1>Compress PDF</h1>
            <form onSubmit={handlecompress}>
<input type="file" name="file"  onChange={handlefilechange} accept="application/pdf"/>
<button type="submit">{loading?'compressing':'compressed pdf'}</button>
            </form>


{compressedurl&&(
    <div>
    <h3>Compress file</h3>   
    <a href={compressedurl} download>
        Download compressed pdf
    </a>
    </div>
)}
    </div>
    );
};



export default Compression;
