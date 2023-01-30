import {
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { Cell } from "models/cell";
import { Memo, MemoContent } from "models/memo";
import { contentsRef, db, memosRef } from "repository";

export const create = async (
  username: string,
  bookTitle: string,
  cells: Cell[]
) => {
  // create new memo
  const memoRef = doc(memosRef);
  const memoId = memoRef.id;
  const memo: Memo = {
    author: username,
    title: bookTitle,
    tags: [],
    id: memoId,
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
  };
  await setDoc(contentRef, content);
};

export const update = async (
  memoId: string,
  contentId: string,
  bookTitle: string,
  cells: Cell[]
) => {
  await updateDoc(doc(db, "contents", contentId), {
    "memo.title": bookTitle,
    "memo.modifiedAt": Timestamp.now(),
    content: JSON.stringify(cells),
  });
  // update memo title
  await updateDoc(doc(db, "memos", memoId), {
    title: bookTitle,
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
  const queryContent = query(contentsRef, where("memo.id", "==", memoId));
  const queryContentSnapshot = await getDocs(queryContent);
  queryContentSnapshot.forEach((doc) => {
    console.log("coding section fetch memo content ID : ", doc.data());
    data = doc.data();
  });
  return data;
};
