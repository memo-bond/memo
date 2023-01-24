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
import { useHistory } from "react-router-dom";
import logo from "assets/images/logo.svg";
import useStyles from "./styles";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { db, firebaseAuth } from "../../index";
import { useEffect, useState } from "react";
import { User } from "../../models/user";
import {
  atom,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { collection, doc, getDocs, getDoc, setDoc } from "firebase/firestore";

export function ListItemLink(props: ListItemProps<"a", { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

// localstorage persist auth user
const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
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
  const resetAuthUser = useResetRecoilState(AuthUser);
  const navigate = useHistory();

  useEffect(() => {
    if (Object.keys(authUser).length > 0) {
      setLoggedIn(true);
      setAuthUser(authUser);
    }
  }, [loggedIn]);

  const logout = () => {
    resetAuthUser();
    alert("Logout Successful");
    navigate.push("/");
  };

  const startUi = async () => {
    signInWithPopup(firebaseAuth, new GoogleAuthProvider())
      .then(async (result) => {
        const user = result.user;
        setLoggedIn(true);
        const loggedUser = {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          picture: user.photoURL,
          username: user.email?.substring(0, user.email?.indexOf("@")),
        };
        setAuthUser(loggedUser);
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("AuthUser", JSON.stringify(loggedUser));
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          console.log("Document data:", userSnap.data());
        } else {
          // create new user
          const usersRef = collection(db, "users");
          await setDoc(doc(usersRef, user.uid), loggedUser);
        }
      })
      .catch((error: any) => {
        console.log("login error ", error.message);
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
                        {authUser.name}
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
