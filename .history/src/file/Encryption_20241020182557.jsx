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




const Encryption=()=>{
    const [selectedfiles,setselectedfiles]=useState(null);
    const [uploadstatus,setuploadstatus]=useState(null);
const [iv,setiv]=useState(null);
const [secretkey,setsecretkey]=useState(null);
const [ encryptionFilePath,setencryptionFilePath]=useState(null);
const [DecryptedFileUrl,setDecryptedFileUrl]=useState(null);


    const handlefilechange=(e)=>{
        setselectedfiles(e.target.files);
        console.log(e.target.files);
    }


    const handleencrypt=async(e)=>{
      e.preventDefault();
   
      const formdata=new FormData();
      if(selectedfiles){   
      for(let i=0;i<selectedfiles.length;i++){
          formdata.append('file',selectedfiles[i]);
          console.log('submitted file',selectedfiles[i]);    
      }
    }

      try{
        console.log("Sending files to backend...");
          const res=await axios.post('https://pdf-backend-1-xl70.onrender.com/api/encrypt-pdf/',formdata,{
              headers:{
                 'Content-Type':'multipart/form-data',
              }
          });
          console.log('encrypt response',res.data)
          // setuploadstatus(res.data.com);
          // console.log('encrypted file url',res.data.encryptedfilepath);

          // Access the Base64 string from the response
          const { encryptionFilePath, secretkey, iv } = res.data;
          console.log("Encrypted PDF (base64):",encryptionFilePath);
          console.log("Secret Key (base64):", secretkey);
          console.log("IV (base64):", iv);
          
          // Store or use these values as needed
          setencryptionFilePath(encryptionFilePath);
          setsecretkey(secretkey);
          setiv(iv);              // Convert the Base64 string to a Blob

          const base64Encrypted= res.data.encryptionFilePath;
                    console.log("base64Encrypted", base64Encrypted);


const pdfBlob = base64ToBlob(base64Encrypted, 'application/pdf');
console.log("pdfBlob", pdfBlob);





// Initialize Firebase Storage
const storage = getStorage();
console.log('successfully get the storage',storage);

// Create a reference to Firebase Storage
const storageRef = ref(storage, `pdfs/encrypted-${Date.now()}.pdf`);
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
  

console.log('secretkey',secretkey);
console.log('iv',iv);
const downloadURL = await getDownloadURL(storageRef);  // Use the original storageRef directly
    console.log('Encrypted file download URL:', downloadURL);

    await handleDecrypt(downloadURL, secretkey, iv);
    

 }catch(error){
          console.log('error encrypted file',error);
      }
    }      
  

    const handleDecrypt = async (fileUrl, secretkey, iv) => {
      
    
    const decryptRes = await axios.post("http://localhost:5002/api/decrypt-pdf/", {
      fileUrl: fileUrl,
      secretkey: secretkey,         // Secret key used during encryption (base64 or hex encoded)
      iv: iv
    });
    
    console.log("Decrypted file response", decryptRes.data);
    setDecryptedFileUrl(decryptRes.data.decryptionFilePath);

    const base64Encrypted= decryptRes.data.decryptionFilePath;
    console.log("base64Encrypted", base64Encrypted);


const pdfBlob = base64ToBlob(base64Encrypted, 'application/pdf');
console.log("pdfBlob", pdfBlob);
      
const storage = getStorage();
// Create a reference to Firebase Storage
const storageRefd = ref(storage, `pdfs/decrypted-${Date.now()}.pdf`);
console.log('path',storageRefd);
// Upload the Blob to Firebase Storage
const uploadTask = uploadBytesResumable(storageRefd, pdfBlob);

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





}   



    

  

  //  }

    return (
        <div>
        <h1>Encrypt PDF</h1>
            <form onSubmit={handleencrypt}>
<input type="file" name="file"  onChange={handlefilechange} accept="application/pdf"/>
<button type="submit">Encrypt</button>
            </form>

            {/* <form onSubmit={ handleDecrypt }>
<button type="submit">Decrypt</button>
            </form> */}
            {DecryptedFileUrl && (
        <div>
        {console.log("Decrypted File URL:", DecryptedFileUrl)}
          <h2>Decrypted File Available At:</h2>
          <a href={DecryptedFileUrl} target="_blank" rel="noopener noreferrer">Download Decrypted File</a>
        </div>
      )}

            {uploadstatus && <p>{uploadstatus}</p>}
    </div>
    );
};



export default Encryption;
