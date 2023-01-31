import { MemoDto } from "dtos";
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
import { memo } from "react";
import { contentsRef, db, memosRef, usersRef } from "repository";
import * as userService from "./user";

export const create = async (uid: string, bookTitle: string, cells: Cell[]) => {
  // create new memo
  const memoRef = doc(memosRef);
  const memo: Memo = {
    id: memoRef.id,
    authorId: uid,
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

const getHomepageMemos = async () => {
  let memos: any = [];
  const queryMemo = query(
    memosRef,
    where("delete", "==", false),
    orderBy("modifiedAt", "desc"),
    limit(10)
  );
  const queryMemoSnapshot = await getDocs(queryMemo);
  queryMemoSnapshot.forEach((doc) => {
    memos.push(doc.data());
  });
  return memos;
};

const getMapAuthorByIds = async (memos) => {
  const authorIds = new Map();
  for (let i = 0; i < memos.length; i++) {
    authorIds.set(memos[i].authorId, "");
  }
  const keys = Array.from(authorIds.keys());
  const queryUser = query(usersRef, where("uid", "in", keys));
  const queryUserSnapshot = await getDocs(queryUser);
  queryUserSnapshot.forEach((doc) => {
    authorIds.set(doc.data().uid, doc.data().username);
  });
  return authorIds;
};

export const getMemos = async (): Promise<MemoDto[]> => {
  const memos = await getHomepageMemos();
  const authorIds = await getMapAuthorByIds(memos);
  const memoDtos: MemoDto[] = [];
  for (let i = 0; i < memos.length; i++) {
    const memoDto: MemoDto = {
      author: authorIds.get(memos[i].authorId),
      title: memos[i].title,
      tags: memos[i].tags,
      id: memos[i].id,
    };
    memoDtos.push(memoDto);
  }
  return memoDtos;
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
