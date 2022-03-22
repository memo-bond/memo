import React from 'react';
import {
  AppBar,
  ListItemProps,
  Box,
  Paper,
  Hidden,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  // IconButton,
  // Popover,
} from '@mui/material';

import { useHistory } from 'react-router-dom';
import useStyles from './styles';

const Footer = () => {
  const classes = useStyles();

  return (
    <Box>
    <a>Footer</a>
    </Box>
  );
};


export default Footer;
