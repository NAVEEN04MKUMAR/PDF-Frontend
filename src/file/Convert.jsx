import React,{useState} from "react";
import axios from "axios";

const Convert=()=>{
    // const [selectedfiles,setselectedfiles]=useState(null);
    const [selectedfiles,setselectedfiles]=useState(null);
    const [loading,setloading]=useState(false);
    const [result,setresult]=useState(null);


    const handlefilechange=(e)=>{
        setselectedfiles(e.target.files);
        console.log(e.target.files);
    }


    const handleconvert=async(e)=>{
      e.preventDefault();
      setloading(true);
      const formdata=new FormData();
      if(selectedfiles){   
      for(let i=0;i<selectedfiles.length;i++){
          formdata.append('file',selectedfiles[i]);
          console.log('submitted file',selectedfiles[i]);    
      }
    }

      try{
        console.log("Sending files to backend...");
          const res=await axios.post('http://localhost:5002/api/converttodocx/',formdata,{
              headers:{
                 'Content-Type':'multipart/form-data',
              }
          });
          console.log('conerting response',res.data)
          setresult(res.data);
          console.log('uploading file',res.data);
      }catch(error){
          console.log('error uploading file',error);
      }
      finally {
        setloading(false);
      }

  }

   

    return (
        <div>
        <h1>Convert PDF</h1>
            <form onSubmit={handleconvert}>
<input type="file" name="file"  onChange={handlefilechange} accept="application/pdf"/>
<button type="submit">{loading?'converting':'convert pdf'}</button>
            </form>


{result&&(
    <div>
    <h3>Convert file</h3>   
    <p>DOCX file:
        <a href={`/${result.docx}`} download={`converted_file.docx`}>Download</a></p>
    <ul>
        {result.images.map((image,index)=>(
            <li key={index}>
                <a href={`/${image}`} download={`image_page_${index+1}.png`}> Download page {image+1} image</a>
            </li>
        ))}
    </ul>
    </div>
)}
    </div>
    );
};



export default Convert;
