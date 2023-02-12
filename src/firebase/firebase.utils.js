import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const config = {
  apiKey: "AIzaSyABO_taasQbsQ2CFXXvvZk-rfV-8TVgcrw",
  authDomain: "crown-clothing-b3daf.firebaseapp.com",
  projectId: "crown-clothing-b3daf",
  storageBucket: "crown-clothing-b3daf.appspot.com",
  messagingSenderId: "727804121268",
  appId: "1:727804121268:web:c09f95e641f8f09ae307e1",
  measurementId: "G-VMN5ER7E11",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
