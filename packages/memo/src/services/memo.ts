import { async } from "@firebase/util";
import axios from "axios";
import { MemoDto } from "dtos";
import {
  doc,
  endBefore,
  getCountFromServer,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { Memo, MemoContent } from "models/memo";
import { Cell } from "pages/Coding/state/cell";
import { contentsRef, db, memosRef } from "repository";
import { API, createHeaders } from "services";

export interface MemoForm {
  title: string;
  cells: Cell[];
  sharing: Boolean;
  tags: string | undefined;
}

export const create = async (token: string, form: MemoForm) => {
  const headers = createHeaders(token);
  const result = await axios.post(
    API + "/v1/memos",
    {
      title: form.title,
      tags: form.tags,
      sharing: form.sharing,
      content: JSON.stringify(form.cells),
    },
    { headers }
  );
};

export const update = async (token: string, id: string, form: MemoForm) => {
  const headers = createHeaders(token);
  const res = await axios.put(
    API + "/v1/memos/" + id,
    {
      sharing: form.sharing,
      title: form.title,
      tags: form.tags,
      content: JSON.stringify(form.cells),
    },
    { headers }
  );
  return res.data;
};

export const updateFirestore = async (
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

export const deleteMemo = async (token: string, memoId: string) => {
  const headers = createHeaders(token);
  const res = await axios.delete(API + "/v1/memos/" + memoId, { headers });
  return res;
};
export const deleteMemoFirestore = async (
  contentId: string,
  memoId: string
) => {
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

export const getBeMemos = async () => {
  const res = await axios.get(API + "/v1/memos");
  return res.data;
};

export const getBeMemo = async (memoId: string, token: string) => {
  const headers = createHeaders(token);
  const res = await axios.get(API + "/v1/memos/" + memoId, { headers });
  return res.data;
};

export const getBeMemoContent = async (memoId: string, token: string) => {
  const headers = createHeaders(token);
  const res = await axios.get(API + "/v1/memos/" + memoId, { headers });
  return res.data;
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

export const getMemosByAuthor = async (
  author: string,
  page: number,
  pageSize: number
) => {
  const res = await axios.get(
    API + `/v1/memos?page=${page}&pageSize=${pageSize}&author=${author}`
  );
  return res.data;
};
