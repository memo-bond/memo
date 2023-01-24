import { collection } from "firebase/firestore";
import { db } from "../index";

export const memosRef = collection(db, "memos");
export const contentsRef = collection(db, "contents");
export const usersRef = collection(db, "users");
