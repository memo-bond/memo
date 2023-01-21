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
  Dialog,
} from "@mui/material";

import logo from "assets/images/logo.svg";
import useStyles from "./styles";
import * as firebaseui from "firebaseui";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  EmailAuthProvider,
  onAuthStateChanged,
} from "@firebase/auth";
import { firebaseAuth } from "../../index";
import { useContext, useState } from "react";
import { User } from "../../models/user";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authUser } from "App";

export function ListItemLink(props: ListItemProps<"a", { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

const ui = new firebaseui.auth.AuthUI(firebaseAuth);
const Header = () => {
  const setLoginUser = useSetRecoilState<User>(authUser);
  const loginUser = useRecoilValue<User>(authUser);

  const css = useStyles();
  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(uid);
      setLoginUser({
        email: user.email,
        name: user.displayName,
      });
    } else {
    }
  });
  const startUi = () => {
    console.log("loginUser ", loginUser);
    ui.start("#firebaseui-auth-container", {
      signInOptions: [
        {
          provider: GithubAuthProvider.PROVIDER_ID,
          signInMethod: GithubAuthProvider.GITHUB_SIGN_IN_METHOD,
        },
        {
          provider: EmailAuthProvider.PROVIDER_ID,
          signInMethod: EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
        },
        {
          provider: GoogleAuthProvider.PROVIDER_ID,
          signInMethod: GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,
        },
      ],
      callbacks: {
        signInSuccessWithAuthResult(result) {
          return true;
        },
      },
      signInFlow: "popup",
      signInSuccessUrl: "/",
    });
  };
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
            <Hidden mdDown>
              <Box
                className={css.navLink}
                display="flex"
                sx={{ flexGrow: 1, ml: "2rem" }}
              >
                <Button className={css.navBtn} variant="text" size="small">
                  Product
                </Button>
              </Box>
              <Box
                className={css.navLink}
                display="flex"
                sx={{ flexGrow: 1, ml: "2rem" }}
              >
                <Button className={css.navBtn} variant="text" size="small">
                  Update
                </Button>
              </Box>
              <Box
                className={css.navLink}
                display="flex"
                sx={{ flexGrow: 1, ml: "2rem" }}
              >
                <Button className={css.navBtn} variant="text" size="small">
                  Pricing
                </Button>
              </Box>
            </Hidden>
          </Grid>
          <Grid item className={css.navRight}>
            <Hidden mdUp>
              <Grid item xs={2} md={8} className={css.burgerBtn}>
                {/* <Menu Mobile /> */}
              </Grid>
            </Hidden>
            <Hidden smDown>
              <Box display="flex" alignItems="center">
                <Button
                  className={css.signup}
                  variant="text"
                  size="small"
                  onClick={startUi}
                >
                  Sign in/Sign Up
                </Button>
              </Box>
              <Box display="flex" alignItems="center">
                <Link href="/code">
                  <Button className={css.codingBtn} variant="text" size="small">
                    Start Coding
                  </Button>
                </Link>
              </Box>
            </Hidden>
          </Grid>
          <div id="firebaseui-auth-container"></div>
        </Grid>
      </Container>
    </header>
  );
};

export default Header;
