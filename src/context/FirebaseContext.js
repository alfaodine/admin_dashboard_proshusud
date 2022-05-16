import { createContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup  } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { query, onSnapshot } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadString, getDownloadURL, deleteObject  } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCm5WtyZbK83dOUfst-wID9qgg1h9srGT4",
  authDomain: "proshusud.firebaseapp.com",
  projectId: "proshusud",
  storageBucket: "proshusud.appspot.com",
  messagingSenderId: "268915249466",
  appId: "1:268915249466:web:0aff73def1e1e1195d0003",
  measurementId: "G-JS0ER1FQ30",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
// const storageRef = ref(storage, 'docs');

function uploadFileToStorage (str, fileName, setUrl) {
  const storageRef = ref(storage, fileName);
  uploadString(storageRef, str, 'base64').then((snapshot) => {
    console.log('Uploaded a base64 string!', snapshot);
    getDownloadURL(storageRef)
    .then((url) => {
      setUrl(url)
    })
    .catch((error) => {
      console.log(error)
    });
  });
}

async function deleteFileFromStorage(fileName){
  deleteObject(ref(storage, fileName)).then(() => {
    console.log('file was deleted')
  }).catch((error) => {
    console.log(error)
  });
}

async function tryToSignIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

} catch (error) {
    // showLoginError(error);
    console.log(error)
}
}

async function setDocInfo(email, field) {
  console.log(email, field)
  const cityRef = doc(db, 'orders', email);
  await setDoc(cityRef,{ field }, { merge: true });
}

async function setComment(email, comment) {
  const cityRef = doc(db, 'orders', email);
  await setDoc(cityRef, comment, { merge: true });
}

async function setUserUrls(email, url) {
  const cityRef = doc(db, 'Users', email);
  await setDoc(cityRef, url, { merge: true });
}

function signOutFromApp() {
  signOut(auth)
  window.location.reload();
}

function signInWithGoogle() {
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user)
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
}

const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [myList, setOrders] = useState([]);
  const [myUsers, setUsers] = useState([]);

  useEffect(() => {
  const q = query(collection(db, "orders"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push(doc.data());
    });

    setOrders(orders)
  });
  },[]);

  useEffect(() => {
      const v = query(collection(db, "Users"));
      const unsubscribe1 = onSnapshot(v, (querySnapshot1) => {
        const orders1 = [];
        querySnapshot1.forEach((doc) => {
          orders1.push(doc.data());
        });
        
      setUsers(orders1)
    });
    },[]);



  return (
    <FirebaseContext.Provider
      value={{
        myList,
        setDocInfo,
        setComment,
        myUsers,
        tryToSignIn,
        signOutFromApp,
        signInWithGoogle,
        uploadFileToStorage,
        setUserUrls,
        deleteFileFromStorage,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;
