import axios from "axios";
import { doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { User } from "models/user";
import { db, usersRef } from "repository";
import { API, createHeaders } from "services";

export const getUser = async (uid: string): Promise<User> => {
  let user: any = {};
  const q = query(usersRef, where("uid", "==", uid));
  const snapshot = await getDocs(q);
  snapshot.forEach((doc) => {
    user = doc.data();
  });
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

export const login = async (token: string) => {
  const headers = createHeaders(token);
  const result = await axios.post(API + "/v1/users/login", null, { headers });
  return result;
};

export const register = async (token: string, username: string) => {
  const headers = createHeaders(token);
  const result = await axios.post(
    API + "/v1/users/register",
    { username },
    { headers }
  );
  return result;
};

export const update = async (
  token: string,
  userId: string,
  displayName: string,
  picture: string
) => {
  const headers = createHeaders(token);
  const res = await axios.put(
    API + "/v1/users/" + userId,
    {
      displayName,
      picture,
    },
    { headers }
  );
  return res;
};
