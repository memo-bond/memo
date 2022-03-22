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

export function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

const Header = () => {
  const classes = useStyles();

  return (
    <Box>
        <a>Header</a>
    </Box>
  );
};


export default Header;
