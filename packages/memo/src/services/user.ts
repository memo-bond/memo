import { doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { User } from "models/user";
import { db, usersRef } from "repository";

export const getUser = async (uid: string): Promise<User> => {
  let user: any = {};
  const q = query(usersRef, where("uid", "==", uid));
  const snapshot = await getDocs(q);
  snapshot.forEach((doc) => {
    user = doc.data();
  });
  console.log("user ", user);

  return user;
};

const getUserByUsername = async (username: string): Promise<User> => {
  const user = await getDoc(doc(db, "users", username));
  return user.data() as User;
};

export const getUserIdByUsername = async (username: string) => {
  const user = await getUserByUsername(username);
  try {
    if (user.uid !== undefined) {
      return user.uid;
    }
  } catch (err: any) {
    return "";
  }
};

export const getTopAuthor = async () => {
  let authors: any = [];
  const q = query(usersRef, limit(10));
  const snapshot = await getDocs(q);
  snapshot.forEach((doc) => {
    authors.push(doc.data());
  });
  return authors;
};
