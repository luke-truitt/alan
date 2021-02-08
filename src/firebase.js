import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB-Ka1sSqIt_mhlKHE2hiIBLdXuixB2Uek",
    authDomain: "alan-taxes.firebaseapp.com",
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
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  
  if (!snapshot.exists) {
    const { email, firstName, lastName, phone } = user;
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
    console.error("Error fetching user", error);
  }
};