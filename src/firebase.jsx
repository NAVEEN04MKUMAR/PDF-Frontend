// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvbvep6sqajyQj5mcS6QODwoOLP9-0vnk",
  authDomain: "pdf-manage-72028.firebaseapp.com",
  databaseURL: "https://pdf-manage-72028-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pdf-manage-72028",
  storageBucket: "pdf-manage-72028.appspot.com",
  messagingSenderId: "990093773128",
  appId: "1:990093773128:web:90d8e16aeb494612a24b7d",
  measurementId: "G-19M8W4CWPW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;