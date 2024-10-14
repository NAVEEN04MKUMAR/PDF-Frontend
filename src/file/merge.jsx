import React,{useState} from "react";
import axios from "axios";

const Mergepdf=()=>{
    const [selectedfiles,setselectedfiles]=useState(null);
    const [mergedfileurl,setmergedfileurl]=useState(null);


    const handlefilechange=(e)=>{
        setselectedfiles(e.target.files);
        console.log(e.target.files);
    }

    const handlesubmit=async(e)=>{
        e.preventDefault();
        const formdata=new FormData();
        if(selectedfiles){   
        for(let i=0;i<selectedfiles.length;i++){
            formdata.append('pdf',selectedfiles[i]);
            console.log('submitted file',selectedfiles[i]);    
        }
      }

        try{
            const res=await axios.post('http://localhost:5002/api/merge-pdf/',formdata,{
                headers:{
                   'Content-Type':'multipart/formdata',
                }
            });
            setmergedfileurl(res.data.mergedfileurl);
            console.log('uploading file',res.data.mergedfileurl)

        }catch{
            console.log('error merging file',error);
        }

    }

    return (
        <div>
        <h1>Mergepdf</h1>
       
            <form onSubmit={handlesubmit}>
<input type="file" name="file" multiple onChange={handlefilechange} accept="application/pdf"/>
<button type="submit">Merge pdf</button>
            </form>


{mergedfileurl&&(
    <div>
         {console.log('Rendering mergedfileurl:', mergedfileurl)} 
        <p>Merged pdf available for download</p>
        <a href={mergedfileurl} download="merged.pdf">Download merged pdf</a>
     </div>
)};
        </div>
    );
};



export default Mergepdf;
