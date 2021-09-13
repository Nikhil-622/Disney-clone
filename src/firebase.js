
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAOUQpfxiTHIXPD9yowX0E8Jq7qGG13JoE",
    authDomain: "disneyplus-clone-5323e.firebaseapp.com",
    projectId: "disneyplus-clone-5323e",
    storageBucket: "disneyplus-clone-5323e.appspot.com",
    messagingSenderId: "969852188259",
    appId: "1:969852188259:web:5f8b4424cf583e9b36ea56",
    measurementId: "G-M80DR49ZYE"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();

  export{auth , provider , storage};
  export default db;