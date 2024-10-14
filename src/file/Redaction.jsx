import React,{useState} from "react";
import axios from "axios";

const Redaction=()=>{
    const [selectedfiles,setselectedfiles]=useState(null);
    const [message,setmessage]=useState('');
    const [redactionitems,setredactionitems]=useState([]);
    const [redactioninput,setredactioninput]=useState('');



    const handlefilechange=(e)=>{
        setselectedfiles(e.target.files);
        console.log(e.target.files);
    }
    const handleredactioninputchange=(e)=>{
        setredactioninput(e.target.value);
        console.log(e.target.value);
    }

    const handleredactioninput=(e)=>{
    //    const value=e.target.value;
       if(redactioninput&&!redactionitems.includes(redactioninput)){
        setredactionitems([...redactionitems,redactioninput]);
       }
       setredactioninput('');
        // console.log('value',value);
    }

    const handleredaction=async(e)=>{
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
    formdata.append('redactionitems',JSON.stringify(redactionitems));;


      try{
        console.log("Sending files to backend...");
          const res=await axios.post('http://localhost:5002/api/redaction-pdf/',formdata,{
              headers:{
                 'Content-Type':'multipart/form-data',
              }
          });
          console.log('redaction response',res.data)
          setmessage(res.data.redactedfilepath);
          console.log('redacted file url',res.data.redactedfilepath);;
      }catch(error){
          console.log('error redacted file',error);
      }
      
  }

   

    return (
        <div>
        <h1> Handle redaction PDF</h1>
            <form onSubmit={handleredaction}>
<input type="file" name="file"  onChange={handlefilechange} accept="application/pdf"/>
<input type="text" placeholder="Enter content to redact" onBlur={handleredactioninput} onChange={handleredactioninputchange}/>
<button type="button"  onClick={handleredactioninput} >Add Redaction items</button>
<button type="submit">Redaction</button>
            </form>



<h4>Redaction items:</h4>
<ul>
    {
        redactionitems.map((item,index)=>(
            <li key={index}>{item}</li>
        ))
    }
</ul>
            {message && <p>{message}</p>}
    </div>
    );
};



export default Redaction;








// import React,{useState} from "react";
// import axios from "axios";

// const App=()=>{
//     const [selectedfiles,setselectedfiles]=useState(null);
//     const [message,setmessage]=useState('');
//     const [annotationtext,setannotationtext]=useState('');
//     const [annotationcontent,setannotationcontent]=useState('');



//     const handlefilechange=(e)=>{
//         setselectedfiles(e.target.files);
//         console.log(e.target.files);
//     }
//     const handleannotationtext=(e)=>{
//         setannotationtext(e.target.value);
//         console.log(e.target.value);
//     }

//     const handleannotationcontent=(e)=>{       
//        setannotationcontent(e.target.value);
//        console.log(e.target.value);
//     }

//     const handletextannotation=async(e)=>{
//         e.preventDefault(); 
//      if(!selectedfiles){
//         setmessage('please select file')
//         return;
//      }
   
//       const formdata=new FormData();
//       if(selectedfiles){   
//       for(let i=0;i<selectedfiles.length;i++){
//           formdata.append('file',selectedfiles[i]);
//           console.log('submitted file',selectedfiles[i]);    
//       }   
//     }
//     formdata.append('annotationtext',annotationtext);
//     formdata.append('annotationcontent',annotationcontent);



//       try{
//         console.log("Sending files to backend...");
//           const res=await axios.post('http://localhost:5002/annotationtext-pdf/',formdata,{
//               headers:{
//                  'Content-Type':'multipart/form-data',
//               }
//           });
//           console.log('annotation response',res.data)
//           setmessage(res.data.annotationtextfilepath);
//           console.log('annotationtext file url',res.data.annotationtextfilepath);;
//       }catch(error){
//           console.log('error annotationtext file',error);
//       }
      
//   }

   

//     return (
//         <div>
//         <h1>annotationtext PDF</h1>
//             <form onSubmit={handletextannotation}>
// <input type="file" name="file"  onChange={handlefilechange} accept="application/pdf"/>
// <input type="text" placeholder="text to annotate" value={annotationtext} onChange={handleannotationtext}/>
// <input type="text" placeholder="Annotation content" value={annotationcontent} onChange={handleannotationcontent}/>

// <button type="button"  onClick={handletextannotation} >Annotationdata</button>
//             </form>


// {/* 
// <h4>Annotation items:</h4>
// <ul>
//     {
//         redactionitems.map((item,index)=>(
//             <li key={index}>{item}</li>
//         ))
//     }
// </ul> */}
//             {message && <p>{message}</p>}
//     </div>
//     );
// };



// export default App;
