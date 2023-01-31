import { getDocs, query, where } from "firebase/firestore";
import { User } from "models/user";
import { usersRef } from "repository";

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
