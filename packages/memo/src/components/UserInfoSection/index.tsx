import React from 'react';
import Box from "@mui/material/Box";
import { Avatar, Container, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { AuthUser } from "../../recoil/authUserState";
import { padding } from '@mui/system';
import {VerifiedUserRounded} from '@mui/icons-material';
import { colorBg } from 'constants/colorsAndSize';

const UserInfoSection = (props) => {
    const authUser = useRecoilValue(AuthUser);

    return <>
        <Box padding={2} marginY={6} height='100%' width='100%'>
            <Grid container>
                <Grid item xs={10} md={4.5}>
                    <input
                        accept="image/*"
                        id="upload-profile-img-button"
                        type="file"
                        hidden
                    />
                    <label htmlFor="upload-profile-img-button">
                        <IconButton sx={{border: 3, borderColor: 'green', borderWidth: 3, padding: 1}}>
                            {authUser.picture ? (
                                <Avatar
                                    src={authUser.picture}
                                    style={{
                                        width: "150px",
                                        height: "150px",
                                    }}
                                />) : <Avatar />}
                        </IconButton>
                    </label>
                </Grid>
                <Grid item xs={14} md={7.5} padding={3}>
                    <Paper elevation={10} sx={{padding: 3}}>
                        <Box margin={4} display='flex'>
                            <Grid container direction="row" spacing={3}>
                                <Grid item xs={5} md={5}>
                                    <TextField
                                        label="ID"
                                        fullWidth
                                        defaultValue={authUser.uid}
                                        disabled
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={5} md={7}>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box margin={4} display='flex'>
                            <Grid container direction="row" spacing={3}>
                                <Grid item xs={5} md={5}>
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        defaultValue={authUser.name}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={5} md={7}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        defaultValue={authUser.email}
                                        size="small"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    </>
};
export default UserInfoSection;