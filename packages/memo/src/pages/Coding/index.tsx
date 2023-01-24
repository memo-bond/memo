import Footer from "layout/Footer";
import Header, { AuthUser } from "layout/Header";
import { memo, useEffect, useState } from "react";
import useStyles from "./styles";
import { getDocs, query, where } from "firebase/firestore";
import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { contentsRef } from "repository";
import { MemoContent } from "models/memo";
import { useRecoilValue } from "recoil";
import MDEditor from "@uiw/react-md-editor";

const CodingPageComponent = () => {
  const css = useStyles();
  const loggedUser = useRecoilValue(AuthUser);
  const [memoContent, setMemoContent] = useState<MemoContent>();
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState<any>();
  const [title, setTitle] = useState<String>();

  const fetchData = async (memoId) => {
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
    setContent(content.content);
    setTitle(memo.title);
  };

  useEffect(() => {
    try {
      if (!memoContent) {
        const a = window.location.pathname.split("-");
        const memoId = a[a.length - 1];
        console.log(memoId);

        fetchData(memoId);
        console.log("loggedUser ", Object.keys(loggedUser).length);
      }
    } catch (err: any) {
      console.log("err.message ", err.message);
    }
  }, [memoContent]);

  const save = () => {};
  const cancel = () => {};

  return (
    <div className={css.homeRoot}>
      <Header />
      {Object.keys(loggedUser).length > 0 && !edit ? (
        <>
          <Button onClick={() => setEdit(true)}>Edit</Button>
        </>
      ) : (
        <></>
      )}
      <Grid>
        <Grid item xs={8}>
          {!edit ? (
            <Card>
              <Typography>{memoContent?.memo.title}</Typography>
              <Typography>{memoContent?.content}</Typography>
            </Card>
          ) : (
            <>
              <TextField
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              >
                Title
              </TextField>
              <MDEditor
                height={600}
                value={content}
                onChange={(e) => setContent(e)}
              />
              <Button onClick={save}>Save</Button>
              <Button onClick={() => setEdit(false)}>Cancel</Button>
            </>
          )}
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};
const CodingPage = memo(CodingPageComponent);
CodingPage.displayName = "CodingPage";
export default CodingPage;
