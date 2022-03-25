import React from "react";
import {
  ListItemProps,
  Box,
  Link,
  Hidden,
  Grid,
  Container,
  ListItem,
  Typography,
  Button,
  styled,
  // IconButton,
  // Popover,
} from "@mui/material";

import logo from "assets/images/logo.svg";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import { purple } from "@mui/material/colors";

export function ListItemLink(props: ListItemProps<"a", { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

const Header = () => {
  const css = useStyles();

  return (
    <header className={css.root}>
      <Container maxWidth="lg" fixed>
        <Grid container className={css.header}>
          <Grid display="flex" item className={css.navLeft}>
            <Grid item className={css.logoContainer}>
              <Link aria-label="homepage" className={css.logoLink}>
                <img src={logo} alt="logo" className={css.logo} />
              </Link>
              <Typography component="h3" className={css.forMemoTxt}>
                Memo
              </Typography>
            </Grid>
            <Box className={css.navLink} display = "flex" sx={{ flexGrow: 1, ml: "2rem" }}>
              <Button className={css.navBtn} variant="text" size="small">
                Product
              </Button>
            </Box>
            <Box className={css.navLink} display = "flex" sx={{ flexGrow: 1, ml: "2rem" }}>
              <Button className={css.navBtn} variant="text" size="small">
                Update
              </Button>
            </Box>
            <Box className={css.navLink} display = "flex" sx={{ flexGrow: 1, ml: "2rem" }}>
              <Button className={css.navBtn} variant="text" size="small">
                Pricing
              </Button>
            </Box>
          </Grid>
          <Grid item className={css.navRight}>
            <Hidden mdUp>
              <Grid item xs={2} md={8} className={css.burgerBtn}>
                {/* <Menu Mobile /> */}
              </Grid>
            </Hidden>
            <Hidden smDown>
              <Box display="flex" alignItems="center">
                <Button className={css.codingBtn} variant="text" size="small">
                  Start Coding
                </Button>
              </Box>
            </Hidden>
          </Grid>
        </Grid>
      </Container>
    </header>
  );
};

export default Header;
