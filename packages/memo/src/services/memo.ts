import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { Memo, MemoContent } from "models/memo";
import { Cell } from "pages/Coding/state/cell";
import { contentsRef, db, memosRef } from "repository";

export const create = async (
  username: string,
  bookTitle: string,
  cells: Cell[]
) => {
  // create new memo
  const memoRef = doc(memosRef);
  const memo: Memo = {
    id: memoRef.id,
    author: username,
    title: bookTitle,
    tags: [],
    createdAt: Timestamp.now(),
    modifiedAt: Timestamp.now(),
    delete: false,
  };
  await setDoc(memoRef, memo);
  // create new content
  const contentRef = doc(contentsRef);
  const content: MemoContent = {
    memo,
    content: JSON.stringify(cells),
    createdAt: Timestamp.now(),
    modifiedAt: Timestamp.now(),
    delete: false,
    id: contentRef.id,
  };
  await setDoc(contentRef, content);
};

export const update = async (
  memoId: string,
  contentId: string,
  title: string,
  cells: Cell[]
) => {
  await updateDoc(doc(db, "contents", contentId), {
    "memo.title": title,
    "memo.modifiedAt": Timestamp.now(),
    content: JSON.stringify(cells),
  });
  // update memo title
  await updateDoc(doc(db, "memos", memoId), {
    title: title,
    modifiedAt: Timestamp.now(),
  });
};

export const deleteMemo = async (contentId: string, memoId: string) => {
  // soft delete
  await updateDoc(doc(db, "contents", contentId), {
    "memo.modifiedAt": Timestamp.now(),
    delete: true,
  });
  await updateDoc(doc(db, "memos", memoId), {
    modifiedAt: Timestamp.now(),
    delete: true,
  });
  const myTimeout = setTimeout("", 500);
};

export const getMemos = async (): Promise<Memo[]> => {
  let datas: any = [];
  const q = query(
    memosRef,
    where("delete", "==", false),
    orderBy("modifiedAt", "desc"),
    limit(10)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log("coding section fetch memo ID : ", doc.id);
    datas.push(doc.data());
  });
  return datas;
};

export const getMemo = async (memoId: string): Promise<MemoContent> => {
  let data: any = {};
  const q = query(contentsRef, where("memo.id", "==", memoId));
  const snapshot = await getDocs(q);
  snapshot.forEach((doc) => {
    data = doc.data();
  });
  return data;
};

export const getMemoContent = async (memoId: string): Promise<MemoContent> => {
  let data: any = {};
  const q = query(contentsRef, where("memo.id", "==", memoId));
  const snapshot = await getDocs(q);
  snapshot.forEach((doc) => {
    data = doc.data();
  });
  return data;
};
