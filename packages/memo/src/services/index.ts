export const API = process.env.REACT_APP_MEMO_BACKEND_API;

export const createHeaders = (token: string) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: token,
  };
  return headers;
};
