

import React,{useState} from "react";
import axios from "axios";

const Rewrite=()=>{
    const [selectedfiles,setselectedfiles]=useState(null);
    const [message,setmessage]=useState('');
    const [annotationtext,setannotationtext]=useState('');



    const handlefilechange=(e)=>{
        setselectedfiles(e.target.files);
        console.log(e.target.files);
    }
    const handleannotationtext=(e)=>{
        setannotationtext(e.target.value);
        console.log(e.target.value);
    }

    const handlerewriteannotation=async(e)=>{
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
    formdata.append('annotationtext',annotationtext);

    try{
        console.log("Sending files to backend...");
          const res=await axios.post('http://localhost:5002/api/rewrite-pdf/',formdata,{
              headers:{
                 'Content-Type':'multipart/form-data',
              }
          });
          console.log('annotation response',res.data)
          setmessage(res.data.annotationrewritefilepath);
          console.log('annotationtext file url',res.data.annotationrewritefilepath);;
      }catch(error){
          console.log('error annotation rewrite file',error);
      }
      
  }

   

    return (
        <div>
        <h1>annotation-rewrite-PDF</h1>
            <form onSubmit={handlerewriteannotation}>
<input type="file" name="file"  onChange={handlefilechange} accept="application/pdf"/>
<input type="text" placeholder="text to annotate" value={annotationtext} onChange={handleannotationtext}/>

<button type="button"  onClick={handlerewriteannotation} >Annotationdata</button>
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



export default Rewrite;
