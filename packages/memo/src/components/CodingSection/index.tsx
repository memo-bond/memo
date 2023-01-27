import { useEffect, useState } from "react";
import { Box, Grid, Card, Typography, Button } from "@mui/material";

import // IconButton,
// Popover,
"@mui/material";

import useStyles from "./styles";
import memo from "assets/images/banner.png";
import { getDocs, limit, query } from "firebase/firestore";
import { memosRef } from "repository";
import { Memo } from "models/memo";
import { useHistory } from "react-router-dom";

export const paymentCodeFormat = [
  {
    image: memo,
  },
  {
    image: memo,
  },
  {
    image: memo,
  },
  {
    image: memo,
  },
  {
    image: memo,
  },
];

const CodingSection = () => {
  const css = useStyles();
  const [memos, setMemos] = useState<Memo[]>();
  const navigate = useHistory();

  useEffect(() => {
    if (!memos) {
      try {
        let datas: any = [];
        const fetchData = async () => {
          const q = query(memosRef, limit(10));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            datas.push(doc.data());
          });
          setMemos(datas);
        };
        fetchData();
      } catch (err: any) {
        console.log("Fetch memos ", err.message);
      }
    }
  }, [memos]);

  const goToBlog = (memo: Memo) => {
    navigate.push(
      "/code/" + memo.title.toLowerCase().replaceAll(" ", "-") + "-" + memo.id
    );
  };

  return (
    <Box className={css.root}>
      <Grid
        md={6}
        xs={12}
        lg={12}
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
          memos.map((m: Memo, i) => (
            <>
              <Grid item xs={16} key={i} style={{ padding: "20px" }}>
                <Card style={{ padding: "30px" }}>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    <Button onClick={() => goToBlog(m)}>{m.title}</Button>
                  </Typography>
                  <Typography className={css.navBtn}>{m.author}</Typography>
                  <Typography className={css.navBtn}>{m.tags}</Typography>
                </Card>
              </Grid>
            </>
          ))
        ) : (
          <>Loading</>
        )}
      </Grid>
    </Box>
  );
};

export default CodingSection;
