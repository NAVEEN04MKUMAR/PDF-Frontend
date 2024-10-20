import React,{useState} from "react";
import axios from "axios";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase.jsx'


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



const Convert=()=>{
    // const [selectedfiles,setselectedfiles]=useState(null);
    const [selectedfiles,setselectedfiles]=useState(null);
    const [loading,setloading]=useState(false);
    const [result,setresult]=useState(null);
const[base64Decrypted ,setbase64Decrypted]=useState(null);

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

          
          // Access the Base64 string from the response
          const {    base64Decrypted } = res.data;
          
          // Store or use these values as needed
          setbase64Decrypted(   base64Decrypted);

          const base64Encryptedf= res.data.base64Decrypted;
          console.log("base64Encrypted", base64Encryptedf);


const pdfBlob = base64ToBlob(base64Encryptedf, 'application/pdf');
console.log("pdfBlob", pdfBlob);





// Initialize Firebase Storage
const storage = getStorage();
console.log('successfully get the storage',storage);

// Create a reference to Firebase Storage
const storageRef = ref(storage, `pdfs/converttodocx-${Date.now()}.docx`);
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
