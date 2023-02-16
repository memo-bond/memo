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
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import logo from "assets/images/logo.svg";
import useStyles from "./styles";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { useEffect, useState } from "react";
import { User } from "../../models/user";
import {
  atom,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { localStorageEffect } from "services/utils";
import { db } from "repository";
import { firebaseAuth } from "services/auth";
import * as userService from "../../services/user";
import { log } from "console";
import axios from "axios";

export function ListItemLink(props: ListItemProps<"a", { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

// useRecoilValue(AuthUser) for global state
export const AuthUser = atom({
  key: "authUser",
  default: {} as User,
  effects_UNSTABLE: [localStorageEffect("authUser")],
});

const Header = () => {
  const setAuthUser = useSetRecoilState(AuthUser);
  const authUser = useRecoilValue(AuthUser);
  const css = useStyles();
  const [loggedIn, setLoggedIn] = useState<boolean>();
  const [isCreateUser, setIsCreateUser] = useState(false);
  const [username, setUsername] = useState("");
  const [googleLoggedUser, setGoogleLoggedUser] = useState<any>();
  const resetAuthUser = useResetRecoilState(AuthUser);
  const navigate = useHistory();

  useEffect(() => {
    if (Object.keys(authUser).length > 0) {
      setLoggedIn(true);
      setAuthUser(authUser);
    }
  }, [loggedIn]);

  const logout = async () => {
    resetAuthUser();
    await firebaseAuth.signOut();
    alert("Logout Successful");
    navigate.push("/");
  };

  const startUi = async () => {
    signInWithPopup(firebaseAuth, new GoogleAuthProvider())
      .then(async (result) => {
        const userResult = result.user;
        const token = await result.user.getIdToken();
        // backend request for authentication
        // 401 not found -> create new user
        // 200 ok with user dto -> mapping
        try {
          const user = await userService.login(token);
          if (user.status === 200) {
            const loggedUser = {
              uid: user.data.id,
              email: user.data.email,
              name: user.data.name,
              picture: user.data.picture,
              username: user.data.username,
            };
            setAuthUser(loggedUser);
            setLoggedIn(true);
          }
        } catch (err: any) {
          console.error("not found create new user");
          setGoogleLoggedUser(userResult);
          setIsCreateUser(true);
        }
      })
      .catch((error: any) => {
        console.error("login error ", error.message);
      });
  };

  const createUser = async () => {
    const token = await firebaseAuth.currentUser?.getIdToken();
    try {
      const result = await userService.register(token!, username);
      const user = result.data;
      const newUser = {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        picture: user.photoURL,
        username: user.username,
      };
      setAuthUser(newUser);
      setLoggedIn(true);
      setIsCreateUser(false);
    } catch (err: any) {
      alert("Username is unvailable, please choose other Username");
    }
  };

  return (
    <header className={css.root}>
      <Container maxWidth="lg" fixed>
        <Grid container className={css.header}>
          <Grid display="flex" item className={css.navLeft}>
            <Grid item className={css.logoContainer}>
              <Link aria-label="homepage" className={css.logoLink} href="/">
                <img src={logo} alt="logo" className={css.logo} />
                <Typography
                  component="h3"
                  className={css.forMemoTxt}
                  style={{ marginTop: "12px" }}
                >
                  Memo
                </Typography>
              </Link>
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
                  <Link className={css.link} href="/teams">
                    Team
                  </Link>
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
                {!loggedIn ? (
                  <Button
                    className={css.signup}
                    variant="text"
                    size="small"
                    onClick={startUi}
                  >
                    Sign in
                  </Button>
                ) : (
                  <>
                    <Link href="/profile">
                      <Button
                        className={css.signup}
                        variant="text"
                        size="small"
                      >
                        {authUser.username}
                      </Button>
                    </Link>

                    <Button
                      className={css.signup}
                      variant="text"
                      size="small"
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </>
                )}
              </Box>
              <Box display="flex" alignItems="center">
                <Link href="/code/">
                  <Button className={css.codingBtn} variant="text" size="small">
                    Start Memo
                  </Button>
                </Link>
              </Box>
            </Hidden>
          </Grid>
          <div id="firebaseui-auth-container"></div>
          <Dialog open={isCreateUser}>
            <DialogContent>
              <Typography>Please choose your username</Typography>
            </DialogContent>
            <TextField
              required
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <DialogActions>
              <Button
                onClick={() => {
                  setIsCreateUser(false);
                  logout();
                }}
              >
                Cancel
              </Button>
              <Button onClick={createUser}>Confirm</Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Container>
    </header>
  );
};

export default Header;
