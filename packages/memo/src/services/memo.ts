import { doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
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
  };
  await setDoc(memoRef, memo);
  // create new content
  const contentRef = doc(contentsRef);
  const content: MemoContent = {
    memo,
    content: JSON.stringify(cells),
    createdAt: Timestamp.now(),
    modifiedAt: Timestamp.now(),
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
