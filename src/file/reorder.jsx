import React,{useState} from "react";
import axios from "axios";

const Reorder=()=>{
    // const [selectedfiles,setselectedfiles]=useState(null);
    const [selectedfiles,setselectedfiles]=useState(null);
    const [order,setorder]=useState([]);
    // const [uploadfile,setuploadfile]=useState('');


    const handlefilechange=(e)=>{
        setselectedfiles(e.target.files);
        console.log(e.target.files);
    }




//   }

    const handlereorder=async(e)=>{
        e.preventDefault();
              const formdata=new FormData();
              if(selectedfiles){   
              for(let i=0;i<selectedfiles.length;i++){
                  formdata.append('file',selectedfiles[i]);
                  console.log('submitted file',selectedfiles[i]);    
              }
              formdata.append('order', JSON.stringify(order));
        try{
            console.log('Sending reorder request with filename:', order);
            const res=await axios.post('http://localhost:5002/api/reorder-pdf/',formdata,{
                headers: {
                    'Content-Type': 'multipart/form-data', // Required for file uploads
                },
            });
            console.log('reordering file',res.data)
        }catch(error){
            console.log('error reodering file',error);
        }

    }
    }
    return (
        <div>
        <h1>Reorderpdf</h1>
       
            <div>
<input type="file" name="file"  onChange={handlefilechange} accept="application/pdf"/>
<button type="submit">Reorder pdf</button>
            </div>

<div>
  <h2>Reorder PDF files</h2>

  <input type="text" placeholder="enter page number comma-separated" onChange={(e)=>setorder(e.target.value.split(',').map(num => Number(num) - 1))}/>
<button onClick={handlereorder}>Reorder PDF</button>

     </div>
        </div>
    );
};



export default Reorder;
