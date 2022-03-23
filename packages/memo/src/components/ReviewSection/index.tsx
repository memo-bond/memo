import React from 'react';
import {
  Box
  // IconButton,
  // Popover,
} from '@mui/material';

import { useHistory } from 'react-router-dom';
import useStyles from './styles';

const BannerSection = () => {
  const css = useStyles();

  return (
    <Box className={css.root}>
    <a>BannerSection</a>
    </Box>
  );
};


export default BannerSection;
