import React from 'react';
import {
  Box
  // IconButton,
  // Popover,
} from '@mui/material';

import { useHistory } from 'react-router-dom';
import useStyles from './styles';

const IntroSection = () => {
  const css = useStyles();

  return (
    <Box className={css.root}>
    <a>IntroSection</a>
    </Box>
  );
};


export default IntroSection;
