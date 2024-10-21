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





const Split=()=>{
    const [selectedfiles,setselectedfiles]=useState(null);
    const [splitedfile,setsplitedfile]=useState([]);
    const [reorderedfileurl,setreorderedfileurl]=useState(null);
    const [reorderedfileurls,setreorderedfileurls]=useState(null);

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
            const apiUrl = import.meta.env.VITE_BACKEND_URL;
            const res=await axios.post(`${apiUrl }/api/splitpdf/`,formdata,{
                headers:{
                   'Content-Type':'multipart/formdata',
                }
            });
            setsplitedfile(res.data.base64Decrypted);
            console.log('uploading file',res.data.base64Decrypted);
            const {base64Decrypted } = res.data;
            console.log("Encrypted PDF (base64):",  base64Decrypted);
            setreorderedfileurl(res.data. base64Decrypted);
           console.log('annotationtext file url',res.data.base64Decrypted);
           
           const base64Encrypted= res.data.base64Decrypted;
           console.log("base64Encrypted", base64Encrypted);
  
 
  
  // Initialize Firebase Storage
  const storage = getStorage();
  console.log('successfully get the storage',storage);

  const uploadedUrls = [];
            for (let i = 0; i < base64Encrypted.length; i++) {
                const base64EncryptedF = base64Encrypted[i];
                console.log(`Base64 File ${i}:`, base64Encrypted);

                const pdfBlob = base64ToBlob(base64EncryptedF, 'application/pdf');
                console.log("pdfBlob", pdfBlob);

                // Create a reference to Firebase Storage
  const storageRef = ref(storage, `pdfs/spliting-${i}-${Date.now()}.pdf`);
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
  console.log('reodering download URL:', downloadURL);
  
  uploadedUrls.push(downloadURL);
                console.log(`File ${i} available at:`, downloadURL);

setreorderedfileurls(uploadedUrls);
        }
        }
        catch(error){
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
