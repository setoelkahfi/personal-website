import app from 'firebase/app';
import 'firebase/database';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyBDMgSgpCGpPQVs2ziPm5igl2nL8I6jdeQ",
    authDomain: "blazing-fire-5965.firebaseapp.com",
    databaseURL: "https://blazing-fire-5965.firebaseio.com",
    projectId: "blazing-fire-5965",
    storageBucket: "blazing-fire-5965.appspot.com",
    messagingSenderId: "1043865982157"
  };
  
export default !app.apps.length ? app.initializeApp(config) : app;