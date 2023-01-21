import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import config from "../config/firebase.config";

export const firebaseApp = initializeApp(config);
export const firebaseAuth = getAuth(firebaseApp);
