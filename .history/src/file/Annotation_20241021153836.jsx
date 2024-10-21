

import React,{useState} from "react";
import axios from "axios";

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


function base64ToBlob(base64, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(base64);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    return new Blob(byteArrays, { type: contentType });
  }


const AnnotationForm=()=>{
    const [selectedfiles,setselectedfiles]=useState(null);
    const [message,setmessage]=useState('');
    const [annotationtext,setannotationtext]=useState('');
    const [annotationcontent,setannotationcontent]=useState('');
    const [reorderedfileurl,setreorderedfileurl]=useState('');



    const handlefilechange=(e)=>{
        setselectedfiles(e.target.files);
        console.log(e.target.files);
    }
    const handleannotationtext=(e)=>{
        setannotationtext(e.target.value);
        console.log(e.target.value);
    }

    const handleannotationcontent=(e)=>{       
       setannotationcontent(e.target.value);
       console.log(e.target.value);
    }

    const handletextannotation=async(e)=>{
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
    formdata.append('annotationcontent',annotationcontent);



      try{
        console.log("Sending files to backend...");
        const apiUrl = import.meta.env.VITE_BACKEND_URL;
          const res=await axios.post(`${apiUrl}/api/annotation-text-pdf/`,formdata,{
              headers:{
                 'Content-Type':'multipart/form-data',
              }
          });
          console.log('annotation response',res.data)
          setmessage(res.data. cloudinary_url);

          
          const { base64Decrypted  } = res.data;
          console.log("Encrypted PDF (base64):", base64Decrypted );
          setreorderedfileurl(res.data. base64Decrypted );
         console.log('annotationtext file url',res.data.base64Decrypted );
         
         const base64Encryptedf= res.data.base64Decrypted ;
         console.log("base64Encrypted", base64Encryptedf);


const pdfBlob = base64ToBlob(base64Encryptedf, 'application/pdf');
console.log("pdfBlob", pdfBlob);

// Initialize Firebase Storage
const storage = getStorage();
console.log('successfully get the storage',storage);

// Create a reference to Firebase Storage
const storageRef = ref(storage, `pdfs/annotationtext-${Date.now()}.pdf`);
console.log('path',storageRef);
// Upload the Blob to Firebase Storage
const uploadTask = uploadBytesResumable(storageRef, pdfBlob);

// Listen for state changes, errors, and completion
uploadTask.on('state_changed',
 (snapshot) => {
   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
   console.log(`Upload is ${progress}% done`);

   switch (snapshot.state) {
       case 'paused':
         console.log('Upload is paused');
         break;
       case 'running':
         console.log('Upload is running');
         break;
     }
 },
 (error) => {
   console.error('Error uploading file:', error);
    // Handle possible errors during upload
    switch (error.code) {
       case 'storage/unauthorized':
         console.log('User does not have permission to access the object.');
         break;
       case 'storage/canceled':
         console.log('User canceled the upload.');
         break;
       case 'storage/unknown':
         console.log('Unknown error occurred:', error.serverResponse);
         break;
     }
 },
 () => {
   // Upload completed successfully
   getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
     console.log('File available at:', downloadURL);
   });
 }
);

// console.log("Fetching encrypted file for decryption...");
 
const downloadURL = await getDownloadURL(storageRef);  // Use the original storageRef directly
console.log('annotationtext download URL:', downloadURL);

        
      }catch(error){
          console.log('error annotationtext file',error);
      }
      
  }

   

    return (
        <div>
        <h1>annotationtext PDF</h1>
            <form onSubmit={handletextannotation}>
<input type="file" name="file"  onChange={handlefilechange} accept="application/pdf"/>
<input type="text" placeholder="text to annotate" value={annotationtext} onChange={handleannotationtext}/>
<input type="text" placeholder="Annotation content" value={annotationcontent} onChange={handleannotationcontent}/>

<button type="button"  onClick={handletextannotation} >Annotationdata</button>
            </form>


            {reorderedfileurl&&(
    <div>
         {console.log('Rendering reorderedfileurl:',reorderedfileurl)} 
        <p>Annotated pdf available for download</p>
        <a href={reorderedfileurl} download="merged.pdf">Download Annotated pdf</a>
     </div>
            )};
            {message && <p>{message}</p>}
    </div>
    );
};



export default AnnotationForm;
