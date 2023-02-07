import Footer from "layout/Footer";
import Header from "layout/Header";
import { memo, useEffect } from "react";
import useStyles from "./styles";
import * as memoService from "../../services/memo";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Grid,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import Spin from "ui/Spin";
import { useState } from "react";
import { MemoDto } from "dtos";
import { Timestamp } from "firebase/firestore";

const AuthorPageComponent = () => {
  const css = useStyles();
  const navigate = useHistory();
  const [memos, setMemos] = useState<MemoDto[]>();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [count, setCount] = useState<number>(0);
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const author = window.location.pathname.split("/")[2];
    setAuthor(author);
    const fetch = async () => {
      if (!memos) {
        const res = await memoService.getMemosByAuthor(author, page, pageSize);
        const count = res.count;
        setCount(res.count);
        setMemos(res.datas);
        setTotalPage(count / pageSize);
      }
    };
    fetch();
  }, [memos]);

  const next = async () => {
    setPage(page + 1);
    const res = await memoService.getMemosByAuthor(author, page + 1, pageSize);
    const count = res.count;
    setCount(res.count);
    setMemos(res.datas);
  };

  const previous = async () => {
    setPage(page - 1);
    const res = await memoService.getMemosByAuthor(author, page - 1, pageSize);
    const count = res.count;
    setCount(res.count);
    setMemos(res.datas);
  };

  const goToMemo = (memo: MemoDto) => {
    navigate.push(
      "/code/" + memo.title.toLowerCase().replaceAll(" ", "-") + "-" + memo.id
    );
  };
  return (
    <>
      <div className={css.homeRoot}>
        <div id="sectionBody" className={css.landingBody}>
          <Header />
          <div className={css.contentBody}>
            <Box className={css.root}>
              <Grid
                style={{
                  display: "flex",
                  maxWidth: "800px",
                  margin: "auto",
                  borderRadius: "16px",
                }}
                alignItems="center"
                justifyContent="center"
                container
                spacing={2}
              >
                {memos ? (
                  memos.map((m: MemoDto, i) => {
                    return (
                      <>
                        <div className={css.memoBlock} key={i}>
                          <Grid
                            item
                            xs={24}
                            key={i}
                            style={{ padding: "20px" }}
                          >
                            <Card style={{ padding: "30px" }}>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                <Button onClick={() => goToMemo(m)}>
                                  {m.title}
                                </Button>
                              </Typography>
                              <Typography className={css.navBtn}>
                                {m.author}
                              </Typography>
                              <Typography className={css.navBtn}>
                                {m.tags}
                              </Typography>
                            </Card>
                          </Grid>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <>
                    <Spin loading></Spin>
                  </>
                )}
              </Grid>
            </Box>
            <Button className={css.navBtn} variant="text" size="small">
              Total: {count}
            </Button>
            <TextField
              value={pageSize}
              label="Page Size"
              type="number"
              onChange={(e) => {
                const size = parseInt(e.target.value);
                setPageSize(size);
                setTotalPage(count / size);
              }}
            ></TextField>
            <Button className={css.navBtn} variant="text" size="small">
              Page: {page}
            </Button>
            {page > 1 ? (
              <>
                <Button onClick={previous}>Previous</Button>
              </>
            ) : (
              <></>
            )}
            {page < totalPage ? (
              <>
                <Button onClick={next}>Next</Button>
              </>
            ) : (
              <></>
            )}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

const Author = memo(AuthorPageComponent);
Author.displayName = "Author";
export default Author;
