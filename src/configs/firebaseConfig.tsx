import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAHX2hPbisfXrVIrSRxVpbTeSayF9DBnNo",
  authDomain: "deber1-310a1.firebaseapp.com",
  databaseURL: "https://deber1-310a1-default-rtdb.firebaseio.com",
  projectId: "deber1-310a1",
  storageBucket: "deber1-310a1.appspot.com",
  messagingSenderId: "1072892718175",
  appId: "1:1072892718175:web:d0583e86fd0e8e72bc7fea",
};

const firebase = initializeApp(firebaseConfig);

export const dbRealTime = getDatabase(firebase);
