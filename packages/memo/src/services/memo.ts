import axios from "axios";
import { Cell } from "pages/Coding/state/cell";
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

export const deleteMemo = async (token: string, memoId: string) => {
  const headers = createHeaders(token);
  const res = await axios.delete(API + "/v1/memos/" + memoId, { headers });
  return res;
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

export const getMemoContent = async (memoId: string, token: string) => {
  const headers = createHeaders(token);
  const res = await axios.get(API + "/v1/memos/" + memoId, { headers });
  return res.data;
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
