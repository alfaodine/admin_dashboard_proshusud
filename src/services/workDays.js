import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { ROUTES } from "../constants/apiRouter.js";

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

export const getWorkingHours = async () => {
  const workHours = [];
  const myCollection = await getDocs(collection(db, ROUTES.WORK_HOUR));
  myCollection.forEach((doc) => {
    const docData = doc.data();
    workHours.push(docData);
  });
  return workHours[0];
};

export const changeWorkHours = async (newWorkHoursState) => {
  const ref = doc(db, ROUTES.WORK_HOUR, "fromTo");
  await setDoc(ref, newWorkHoursState);
};

export const getAllBookedDates = async () => {
  const res = [];
  const myCollection = await getDocs(collection(db, ROUTES.DISABLED_HOURS));
  myCollection.forEach((doc) => {
    const docData = doc.data();
    res.push({ [doc.id]: docData });
  });
  // console.log(res);
  return res;
};

export const getBookedTimeByDate = async (date) => {
  // date should be YYYY/MM/DD
  const formattedDate = date.replace(/\//g, "-");
  const ref = doc(db, ROUTES.DISABLED_HOURS, formattedDate);
  const document = await getDoc(ref);
  return document?.data()?.time || [];
};

export const setBookedTime = async (date, bookedTimeList) => {
  // date should be YYYY/MM/DD
  const formattedDate = date.replace(/\//g, "-");
  const ref = doc(db, ROUTES.DISABLED_HOURS, formattedDate);
  await setDoc(ref, { time: bookedTimeList });
};
