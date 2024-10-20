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
            const res=await axios.post('https://pdf-backend-1-xl70.onrender.com/api/merge-pdf/',formdata,{
                headers:{
                   'Content-Type':'multipart/formdata',
                }
            });
           const {  mergedpdfurl } = res.data;
           console.log("Encrypted PDF (base64):", mergedpdfurl);
           setmergedfileurl(res.data.mergedpdfurl);
        //   console.log('annotationtext file url',res.data.annotationerasefilepath);
          
          const base64Encrypted= res.data.mergedpdfurl;
                    console.log("base64Encrypted", base64Encrypted);


const pdfBlob = base64ToBlob(base64Encrypted, 'application/pdf');
console.log("pdfBlob", pdfBlob);





// Initialize Firebase Storage
const storage = getStorage();
console.log('successfully get the storage',storage);

// Create a reference to Firebase Storage
const storageRef = ref(storage, `pdfs/merge-${Date.now()}.pdf`);
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

console.log("Fetching encrypted file for decryption...");
  

const downloadURL = await getDownloadURL(storageRef);  // Use the original storageRef directly
    console.log('Encrypted file download URL:', downloadURL);


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
