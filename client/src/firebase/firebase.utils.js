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

  export const updateCartOnFireStore = async (userId, cart)=>{
    
    try {
      const userRef = firestore.doc(`users/${userId}`);
      await userRef.update({
        userCart: cart
      })
    } catch (error) {
      return console.log('error saving cart');
    }

  };


  export const addCollectionAndDocuments=async (collectionKey, objecctsToAdd)=>{
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    
    objecctsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
      
    });

    return await batch.commit();

  }

  export const convertCollectionsSnapshotToMap= (collections)=>{
    const transformedCollections = collections.docs.map(doc=>{
      const {title, items}= doc.data();
      return {id:doc.id, routeName: encodeURI(title.toLowerCase()), items, title}
    })
    
  
    return( transformedCollections.reduce((accumulator, collection)=>{
       accumulator[collection.title.toLowerCase()] = collection;
       return accumulator;
    },{}))
  
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();

  googleProvider.setCustomParameters({prompt: 'select_account'});
  
  export const getCurrentUser =()=> {
    return new Promise((resolve, reject)=>{
      const unsubscribeFromAuth = auth.onAuthStateChanged(user=>{
        unsubscribeFromAuth();
        resolve(user)
      }, reject)

    })
  }
  //export const signInWithGoogle=()=> auth.signInWithPopup(googleProvider);
  
  export default firebase;