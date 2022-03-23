import React from 'react';
import {
  Box
  // IconButton,
  // Popover,
} from '@mui/material';

import { useHistory } from 'react-router-dom';
import useStyles from './styles';

const ReviewSection = () => {
  const css = useStyles();

  return (
    <Box className={css.root}>
    <a>ReviewSection</a>
    </Box>
  );
};


export default ReviewSection;
