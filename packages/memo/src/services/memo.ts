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

export const create = async (
  token: string,
  title: string,
  cells: Cell[],
  tags: string | undefined
) => {
  const headers = createHeaders(token);
  const result = await axios.post(
    API + "/v1/memos",
    {
      title,
      tags,
      content: JSON.stringify(cells),
    },
    { headers }
  );
};

export const update = async (
  token: string,
  id: string,
  title: string,
  cells: Cell[],
  tags: string | undefined
) => {
  const headers = createHeaders(token);
  const res = await axios.put(
    API + "/v1/memos/" + id,
    {
      title,
      content: JSON.stringify(cells),
      tags,
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

export const getBeMemos = async () => {
  const res = await axios.get(API + "/v1/memos");
  return res.data;
};

export const getMemos = async (): Promise<MemoDto[]> => {
  const memos = await getHomepageMemos();
  const memoDtos: MemoDto[] = [];
  for (let i = 0; i < memos.length; i++) {
    const memoDto: MemoDto = {
      author: memos[i].author,
      title: memos[i].title,
      tags: memos[i].tags,
      id: memos[i].id,
    };
    memoDtos.push(memoDto);
  }
  return memoDtos;
};

export const getBeMemo = async (memoId: string) => {
  const res = await axios.get(API + "/v1/memos/" + memoId);
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

export const getBeMemoContent = async (memoId: string) => {
  const res = await axios.get(API + "/v1/memos/" + memoId);
  return res.data;
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

export const getMemosByAuthorFirestore = async (
  author: string,
  pageSize: number,
  firstSnapshot: any,
  lastSnapshot: any
): Promise<MemoDto[]> => {
  let memos: Memo[] = [];
  if (firstSnapshot === undefined && lastSnapshot === undefined) {
    console.log("first page");
    const q = query(
      memosRef,
      where("author", "==", author),
      where("delete", "==", false),
      orderBy("modifiedAt", "desc"),
      limit(pageSize)
    );
    const snapshot = await getDocs(q);
    firstSnapshot = snapshot.docs[0];
    lastSnapshot = snapshot.docs[snapshot.docs.length - 1];
    snapshot.forEach((doc) => {
      memos.push(doc.data() as Memo);
    });
  } else if (lastSnapshot) {
    // next page
    console.log("next");

    const q = query(
      memosRef,
      where("author", "==", author),
      where("delete", "==", false),
      orderBy("modifiedAt", "desc"),
      startAfter(lastSnapshot),
      limit(pageSize)
    );
    const snapshot = await getDocs(q);
    firstSnapshot = snapshot.docs[0];
    lastSnapshot = snapshot.docs[snapshot.docs.length - 1];
    snapshot.forEach((doc) => {
      memos.push(doc.data() as Memo);
    });
  } else if (firstSnapshot) {
    // previous page
    console.log("previous");

    const q = query(
      memosRef,
      where("author", "==", author),
      where("delete", "==", false),
      orderBy("modifiedAt", "desc"),
      endBefore(firstSnapshot),
      limitToLast(pageSize)
    );
    const snapshot = await getDocs(q);
    firstSnapshot = snapshot.docs[0];
    lastSnapshot = snapshot.docs[snapshot.docs.length - 1];
    snapshot.forEach((doc) => {
      console.log("doc ", doc.data());

      memos.push(doc.data() as Memo);
    });
  }

  const memoDtos: MemoDto[] = [];
  memos.forEach((m) => {
    const memoDto: MemoDto = {
      author: author,
      title: m.title,
      tags: m.tags,
      id: m.id,
    };
    memoDtos.push(memoDto);
  });
  return memoDtos;
};

export const countMemosByAuthor = async (author: string): Promise<number> => {
  const q = query(
    memosRef,
    where("author", "==", author),
    where("delete", "==", false)
  );
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};
