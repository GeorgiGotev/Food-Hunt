// Import the functions you need from the SDKs you need
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAs4VmwbeMCeYhjdZbDt0TzXjQ4gItg_Yw",
  authDomain: "food-recipes-d564f.firebaseapp.com",
  projectId: "food-recipes-d564f",
  storageBucket: "food-recipes-d564f.appspot.com",
  messagingSenderId: "951805259299",
  appId: "1:951805259299:web:fc2499ba589e2ab0338b96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export const db = getFirestore(app);
export const authenticated = getAuth(app);

const storage = getStorage();

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}

export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);

  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, { photoURL });
  setLoading(false);
}

