import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const Config = {
    apiKey: "AIzaSyBUDi-GL0lt8a_IRSYwHRVzo9-fxcnpIK4",
    authDomain: "crwn-db-d44b2.firebaseapp.com",
    databaseURL: "https://crwn-db-d44b2.firebaseio.com",
    projectId: "crwn-db-d44b2",
    storageBucket: "crwn-db-d44b2.appspot.com",
    messagingSenderId: "246443045802",
    appId: "1:246443045802:web:c213388ad0ae03443d71d3",
    measurementId: "G-FKTXQW7JVD"
  }

  firebase.initializeApp(Config);

  export const createUserProfileDocument= async(userAuth,additionalData )=>{
    if(!userAuth) {return};
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot =await  userRef.get();
    if(!snapShot.exists){
      const {displayName, email}= userAuth;
      const createdAt = new Date()
      try {
        userRef.set({
          displayName, 
          email, 
          createdAt,
          ...additionalData
        })
      } catch(error){
        console.log('Error creating user ,', error.message);
      }

    };
    return userRef;
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({prompt: 'select_account'});
  
  export const signInWithGoogle=()=> auth.signInWithPopup(provider);
  
  export default firebase;