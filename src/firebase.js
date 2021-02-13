import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
    apiKey: "AIzaSyB-Ka1sSqIt_mhlKHE2hiIBLdXuixB2Uek",
    authDomain: "auth.fromstandard.com",
    projectId: "alan-taxes",
    storageBucket: "alan-taxes.appspot.com",
    messagingSenderId: "31692548469",
    appId: "1:31692548469:web:afbd5ba64498ed999a4b3c",
    measurementId: "G-FL6C0RL62K"
  };

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = (referToId, referById, refundBreakdown) => {
  
  return auth.signInWithPopup(provider).then((result) => {
    if(referToId=="") {
      referToId = uuidv4();
    }
    
    // The signed-in user info.
    var user = result.user;
    const firstName = user.displayName.split(" ")[0];
    const lastName = "";
    const phone = user.phoneNumber;
    generateUserDocument(user, { firstName, lastName, phone, referToId, referById,refundBreakdown })
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
};

export const getUserDoc = async (user) => {
  if (!user || !user.user) return;
  
  const userRef = firestore.collection('users').doc(user.user.uid);
  const doc = await userRef.get();
  if (!doc.exists) {
    
    return null;
  } else {
    
    return doc.data()
  }
}

export const updateUser = async (uid, fields) => {
  try {
    const userRef = firestore.collection('users').doc(uid);
    const res = await userRef.update(fields);
    return res;
  } catch (error) {
    
    return null;
  };
}

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  
  const snapshot = await userRef.get();
  
  if (!snapshot.exists) {
    const { email, firstName, lastName, phone } = user;
    // const displayName = firstName;
    try {
      await userRef.set({
        firstName,
        lastName,
        email,
        phone,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    
  }
};

export const findUserByEmail = async (email) => {
  if(!email) return null;
  try {
    const snapshot = await firestore.collection("users").where('email','==',email).get();
    if (snapshot.empty) {
      
      return;
    }  
    let user = {}
    
    snapshot.forEach(doc => {
      user = doc.data();
    });

    return user;
  } catch (error) {
    
  }
}