import { Timestamp } from "firebase/firestore";

interface Base {
  createdAt: Timestamp;
  modifiedAt: Timestamp;
  delete: boolean;
  id: string;
}
export interface Memo extends Base {
  authorId: string;
  title: string;
  tags: string[];
}

export interface MemoContent extends Base {
  memo: Memo;
  content: string;
}
