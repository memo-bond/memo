import React from 'react';
import {
  Link, Box, Grid
} from '@mui/material';

import {
  
  // IconButton,
  // Popover,
} from '@mui/material';

import CustomSwiper from "../../../src/components/CustomSwiper";
import { useHistory } from 'react-router-dom';
import bannerImage from 'assets/images/banner.png';
import useStyles from './styles';
import memo from 'assets/images/banner.png';

export const paymentCodeFormat = [
  {
    image: memo,
  },
  {
    image: memo,
  },
];

const BannerSection = () => {
  const css = useStyles();

  return (
    <Box className={css.root}>
    <Grid item md={6} xs={12} lg={12} style={{ display: "flex", maxWidth: "1256px", margin: "auto", backgroundColor: "#000000", borderRadius: "16px" }} alignItems="center" justifyContent="center">
      <CustomSwiper data={paymentCodeFormat}/>
    </Grid>
    </Box>
  );
};


export default BannerSection;
