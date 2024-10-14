import React,{useState} from "react";
import axios from "axios";

const Split=()=>{
    const [selectedfiles,setselectedfiles]=useState(null);
    const [splitedfile,setsplitedfile]=useState([]);


    const handlefilechange=(e)=>{
        setselectedfiles(e.target.files);
        console.log(e.target.files);
    }

    const handlesubmit=async(e)=>{
        e.preventDefault();
        const formdata=new FormData();
        if(selectedfiles){   
        for(let i=0;i<selectedfiles.length;i++){
            formdata.append('file',selectedfiles[i]);
            console.log('submitted file',selectedfiles[i]);    
        }
      }

        try{
            const res=await axios.post('http://localhost:5002/api/splitpdf/',formdata,{
                headers:{
                   'Content-Type':'multipart/formdata',
                }
            });
            setsplitedfile(res.data.files);
            console.log('uploading file',res.data.files)

        }catch(error){
            console.log('error merging file',error);
        }

    }

    return (
        <div>
        <h1>Splitpdf</h1>
       
            <form onSubmit={handlesubmit}>
<input type="file" name="file"  onChange={handlefilechange} accept="application/pdf"/>
<button type="submit">Split pdf</button>
            </form>

<div>
  <h2>Split files</h2>
  <ul>
{splitedfile.map((file,index)=>(
      <li key={index}>
        <a href={`http://localhost:5002/download/${file}`} download>{file}</a>
      </li>
))};
</ul>
        </div>
        </div>
    );
};



export default Split;
