import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import App from "App";
import reportWebVitals from "reportWebVitals";
import "./index.css";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3IzAH-FOh3_SDOBecJZtv4LRjwHfvc0s",
  authDomain: "memo-9b895.firebaseapp.com",
  projectId: "memo-9b895",
  storageBucket: "memo-9b895.appspot.com",
  messagingSenderId: "701798161487",
  appId: "1:701798161487:web:48dd766a316c63911bde3a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const firebaseAuth = getAuth(app);
ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
