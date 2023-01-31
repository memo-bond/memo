import { Timestamp } from "firebase/firestore";

interface Base {
  createdAt: Timestamp;
  modifiedAt: Timestamp;
  delete: boolean;
  id: string | undefined;
}
export interface Memo extends Base {
  author: string;
  title: string;
  tags: string[];
}

export interface MemoContent extends Base {
  memo: Memo;
  content: string;
}
