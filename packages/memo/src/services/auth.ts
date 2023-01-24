import { getAuth } from "firebase/auth";
import { app } from "index";

export const firebaseAuth = getAuth(app);
