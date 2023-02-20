import useStyles from './styles';
import { useEffect, useState, useRef } from "react";
import { AuthUser } from 'recoil/authUserState';
import { Avatar, Box, Button, ClickAwayListener, Divider, Grow, ListItemIcon, Menu, MenuItem, Paper, Popper, Tooltip, Typography, MenuList, Link } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { firebaseAuth } from "services/auth";
import { useHistory } from "react-router-dom";
import { Logout, Settings, Groups2 } from '@mui/icons-material';

const LoginedDropdown = () => {
    const style = useStyles();
    const authUser = useRecoilValue(AuthUser);
    const resetAuthUser = useResetRecoilState(AuthUser);
    const navigate = useHistory();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        resetAuthUser();
        await firebaseAuth.signOut();
        alert("Logout Successful");
        navigate.push("/");
    };
    return (
        <>
            <Button aria-controls={open ? 'account-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}>
                <Box display="flex" borderRadius={2} borderColor="whitesmoke" paddingY={1.5}>
                    {typeof authUser.picture != 'undefined' && authUser.picture ? (<Avatar src={authUser.picture} />) : (<Avatar />)}
                </Box>
            </Button>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                classes={{ paper: style.dropdownMenuPaper }}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                    elevation: 10,
                    sx: {
                        overflow: 'revert',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                    },
                }}
            >
                <Paper className={style.dropdownUserInfoItem} elevation={4}>
                    <MenuItem>
                        <Box display="flex" borderRadius={2} borderColor="whitesmoke" paddingY={1.5}>
                            {typeof authUser.picture != 'undefined' && authUser.picture ? (<Avatar src={authUser.picture} />) : (<Avatar />)}
                            <Typography display="flex" alignItems="center" marginX={2} variant="subtitle1" color="white">{authUser?.name}</Typography>
                        </Box>
                    </MenuItem>
                    <Box textAlign='center' justifyContent="center">
                        <Link href="/">
                            <Button >
                                <Typography variant="subtitle2" color='burlywood'>
                                    Update Info
                                </Typography>
                            </Button>
                        </Link>
                    </Box>
                </Paper>
                <MenuItem>
                    <Groups2 color="disabled" />
                    <Typography alignItems="center" marginX={2} variant="subtitle1" color="white">My Teams</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <Logout color="disabled" />
                    <Typography display="flex" alignItems="center" marginX={2} variant="subtitle1" color="white">Log Out</Typography>
                </MenuItem>
            </Menu>
        </>
    );
}

export default LoginedDropdown;