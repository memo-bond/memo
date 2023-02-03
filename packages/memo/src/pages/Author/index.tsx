import Footer from "layout/Footer";
import Header from "layout/Header";
import { memo, useEffect } from "react";
import useStyles from "./styles";
import * as memoService from "../../services/memo";
import { useHistory } from "react-router-dom";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import Spin from "ui/Spin";
import { useState } from "react";
import { MemoDto } from "dtos";

const AuthorPageComponent = () => {
  const css = useStyles();
  const navigate = useHistory();
  const [memos, setMemos] = useState<MemoDto[]>();
  useEffect(() => {
    const author = window.location.pathname.split("/")[2];
    const fetch = async () => {
      if (!memos) {
        const memos = await memoService.getMemosByAuthor(author);
        setMemos(memos);
      }
    };
    fetch();
  }, [memos]);

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
                        <Grid item xs={24} key={i} style={{ padding: "20px" }}>
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
          <Footer />
        </div>
      </div>
    </>
  );
};

const Author = memo(AuthorPageComponent);
Author.displayName = "Author";
export default Author;
