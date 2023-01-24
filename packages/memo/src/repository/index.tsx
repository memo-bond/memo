import { collection, getFirestore } from "firebase/firestore";
import { app } from "../index";

export const db = getFirestore(app);
export const memosRef = collection(db, "memos");
export const contentsRef = collection(db, "contents");
export const usersRef = collection(db, "users");
