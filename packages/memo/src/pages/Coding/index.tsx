import Footer from "layout/Footer";
import Header, { authUser } from "layout/Header";
import { memo, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import useStyles from "./styles";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../index";
import { Button, Card, Grid, Typography } from "@mui/material";
import { contentsRef, memosRef } from "repository";
import { Memo, MemoContent } from "models/memo";

const user = JSON.parse(localStorage.getItem("AuthUser")!);

const CodingPageComponent = () => {
  const css = useStyles();
  const [memoContent, setMemoContent] = useState<MemoContent>();

  useEffect(() => {
    try {
      if (!memoContent) {
        const a = window.location.pathname.split("-");
        const memoId = a[a.length - 1];
        console.log(memoId);
        const fetchData = async () => {
          // fetch content
          // const contentRef = doc(db, "contents", memoId);
          // const contentDoc = await getDoc(contentRef);
          // const content = contentDoc.data()!;

          let content;
          const q = query(contentsRef, where("memo.id", "==", memoId));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            content = doc.data();
          });

          const memo = content.memo;

          setMemoContent({
            memo: {
              title: memo.title,
              author: memo.author,
              tags: memo.tags,
              id: memoId,
              createdAt: memo.createdAt,
              modifiedAt: memo.modifiedAt,
            },
            content: content.content,
            createdAt: content.createdAt,
            modifiedAt: content.modifiedAt,
          });
        };
        fetchData();
      }
    } catch (err: any) {
      console.log("err.message ", err.message);
    }
  }, [memoContent]);

  return (
    <div className={css.homeRoot}>
      <Header />
      <Grid>
        <Grid item xs={8}>
          <Card>
            <Typography>{memoContent?.memo.title}</Typography>
            <Typography>{memoContent?.content}</Typography>
          </Card>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};
const CodingPage = memo(CodingPageComponent);
CodingPage.displayName = "CodingPage";
export default CodingPage;
