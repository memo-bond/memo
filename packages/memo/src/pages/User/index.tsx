import Footer from "layout/Footer";
import Header from "layout/Header";
import { memo, useEffect, useState } from "react";
import useStyles from "./styles";
import {
  doc,
  getDocs,
  limit,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { Button } from "@mui/material";
import { Memo, MemoContent } from "models/memo";
import { contentsRef, memosRef } from "repository";

const user = JSON.parse(localStorage.getItem("AuthUser")!);

const CodingPageComponent = () => {
  const css = useStyles();
  const [memos, setMemos] = useState();

  useEffect(() => {
    if (!memos) {
      try {
        const fetchData = async () => {
          const querySnapshot = await getDocs(
            query(memosRef, where("uid", "==", user.uid!), limit(2))
          );
          let datas: any = [];
          querySnapshot.forEach((doc) => {
            datas.push(doc.data());
          });
          setMemos(datas);
        };
        fetchData();
      } catch (err: any) {
        console.log("err.message ", err.message);
      }
    }
  }, [memos]);

  const addMemo = async () => {
    const now = Timestamp.now();
    // add memo
    const memoRef = doc(memosRef);
    const memoId = memoRef.id;
    const memo: Memo = {
      title: "How to use Spring Boot Web Starter",
      author: "memo",
      tags: ["java", "spring boot", "starter"],
      id: memoId,
      createdAt: now,
      modifiedAt: now,
    };
    await setDoc(memoRef, memo);
    // add content
    const contentRef = doc(contentsRef);
    const content: MemoContent = {
      memo,
      content: "hello the world",
      createdAt: now,
      modifiedAt: now,
    };
    await setDoc(contentRef, content);
  };

  const getMemos = async () => {
    const querySnapshot = await getDocs(
      query(memosRef, where("uid", "==", user.uid!), limit(2))
    );
    querySnapshot.forEach((doc) => {
      console.log("Memo ID : ", doc.id);
      console.log("Memo data : ", doc.data());
    });
  };

  return (
    <div className={css.homeRoot}>
      <Header />
      <Button
        onClick={addMemo}
        className={css.codingBtn}
        variant="text"
        size="small"
      >
        Add New Memo
      </Button>

      <Button
        onClick={getMemos}
        className={css.codingBtn}
        variant="text"
        size="small"
      >
        Get 10 memos
      </Button>
      {memos ? <>abc</> : <>xyz</>}
      <Footer />
    </div>
  );
};
const CodingPage = memo(CodingPageComponent);
CodingPage.displayName = "CodingPage";
export default CodingPage;
