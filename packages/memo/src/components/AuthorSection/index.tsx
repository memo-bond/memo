import { useEffect, useState } from "react";
import { Box, Grid, Card, Typography, Button } from "@mui/material";
import useStyles from "./styles";
import { useHistory } from "react-router-dom";
import Spin from "ui/Spin";
import * as userService from "../../services/user";
import { User } from "models/user";

const AuthorSection = () => {
  const css = useStyles();
  const [authors, setAuthors] = useState([]);
  const navigate = useHistory();
  useEffect(() => {
    try {
      const fetchData = async () => {
        let datas = await userService.getTopAuthor();
        setAuthors(datas);
      };
      fetchData();
    } catch (err: any) {
      console.log("Fetch memos ", err.message);
    }
  }, [authors]);

  const goToAuthor = (memo: User) => {
    navigate.push("/author/" + memo.username);
  };

  return (
    <>
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
          {authors ? (
            authors.map((m: User, i) => (
              <>
                <Grid item xs={16} key={i} style={{ padding: "20px" }}>
                  <Card style={{ padding: "30px" }}>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      <Button onClick={() => goToAuthor(m)}>
                        {m.username}
                      </Button>
                    </Typography>
                    <Typography className={css.navBtn}>{m.name}</Typography>
                  </Card>
                </Grid>
              </>
            ))
          ) : (
            <>
              <Spin loading></Spin>
            </>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default AuthorSection;
