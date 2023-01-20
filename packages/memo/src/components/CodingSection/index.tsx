import React from 'react';
import {Grid} from '@mui/material';
import useStyles from './styles';


const CodingSection = () => {
  const css = useStyles();

  return (
    <Grid container className={css.root}>
        Hello Coding Area
    </Grid >

  );
};


export default CodingSection;
