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

  useEffect(() => {
    console.log("fetch data 1");
    if (!memos) {
      try {
        console.log("fetch data 2");
        let datas: any = [];
        const fetchData = async () => {
          const q = query(memosRef, limit(3));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            datas.push(doc.data());
          });
          console.log("fetched data : ", JSON.stringify(datas));
          setMemos(datas);
        };
        fetchData();
      } catch (err: any) {
        console.log("Fetch memos ", err.message);
      }
    }
  }, [memos]);

  const goToBlog = (memo: Memo) => {
    location.href =
      "/code/" + memo.title.toLowerCase().replaceAll(" ", "-") + "-" + memo.id;
  };

  return (
    <Box className={css.root}>
      <Grid
        item
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
          memos.map((m: Memo) => (
            <>
              <Grid item xs={16}>
                <Card id={m.id}>
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
          <>ABC</>
        )}
      </Grid>
    </Box>
  );
};

export default CodingSection;
