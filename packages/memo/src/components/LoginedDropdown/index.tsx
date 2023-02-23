import useStyles from "./styles";
import { useEffect, useState, useRef } from "react";
import { AuthUser } from "recoil/authUserState";
import {
  Avatar,
  Box,
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  Paper,
  Popper,
  Typography,
  MenuList,
  Link,
  Badge,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { firebaseAuth } from "services/auth";
import { useHistory } from "react-router-dom";
import { Logout, Groups2, NotificationsNone } from "@mui/icons-material";

const LoginedDropdown = () => {
  const style = useStyles();
  const authUser = useRecoilValue(AuthUser);
  const resetAuthUser = useResetRecoilState(AuthUser);
  const navigate = useHistory();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleLogout = async () => {
    resetAuthUser();
    await firebaseAuth.signOut();
    alert("Logout Successful");
    navigate.push("/");
  };
  return (
    <>
        <Box display="flex" marginX={1.5}>
      <IconButton aria-label="cart">
        <Badge badgeContent={4} color="success">
          <NotificationsNone color="disabled" />
        </Badge>
      </IconButton>
      </Box>
      <IconButton
        ref={anchorRef}
        id="account-button"
        aria-controls={open ? "account-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Box
          display="flex"
          borderRadius={2}
          borderColor="whitesmoke"
          paddingY={1.5}
        >
          {typeof authUser.picture != "undefined" && authUser.picture ? (
            <Avatar src={authUser.picture} />
          ) : (
            <Avatar />
          )}
        </Box>
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        modifiers={[
          {
            name: "preventOverflow",
            enabled: true,
            options: {
              altAxis: true,
              altBoundary: true,
              tether: true,
              rootBoundary: "document",
              padding: 8,
            },
          },
        ]}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: "right top",
            }}
          >
            <Paper className={style.dropdownMenuPaper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="account-menu"
                  aria-labelledby="account-button"
                  onKeyDown={handleListKeyDown}
                >
                  <Paper className={style.dropdownUserInfoItem} elevation={4}>
                    <MenuItem>
                      <Box display="flex" flexDirection="row">
                        {typeof authUser.picture != "undefined" &&
                        authUser.picture ? (
                          <Avatar src={authUser.picture} />
                        ) : (
                          <Avatar />
                        )}
                        <Typography
                          noWrap
                          display="flex"
                          alignItems="center"
                          marginX={2}
                          variant="subtitle1"
                          color="white"
                        >
                          {authUser?.name}
                        </Typography>
                      </Box>
                    </MenuItem>
                    <Box textAlign="center" justifyContent="center">
                      <Link href="/">
                        <Button>
                          <Typography variant="subtitle2" color="burlywood">
                            Update Info
                          </Typography>
                        </Button>
                      </Link>
                    </Box>
                  </Paper>
                  <MenuItem>
                    <Groups2 color="disabled" />
                    <Typography
                      alignItems="center"
                      marginX={2}
                      variant="subtitle1"
                      color="white"
                    >
                      My Teams
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Logout color="disabled" />
                    <Typography
                      display="flex"
                      alignItems="center"
                      marginX={2}
                      variant="subtitle1"
                      color="white"
                    >
                      Log Out
                    </Typography>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default LoginedDropdown;
