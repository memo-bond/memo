import React from 'react';
import {
  Box, Button, Grid, Link, Typography
  // IconButton,
  // Popover,
} from '@mui/material';

import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import reactjs from 'assets/images/reactjs.png';
import angular from 'assets/images/angular.png';
import javascript from 'assets/images/javascript.png';


const IntroSection = () => {
  const css = useStyles();

  return (
    <Grid container className={css.root}>
      <Grid item>
        <Typography component="h1" className={css.titleTxt}>
          Coding platform to empower engineers
        </Typography>
      </Grid>

      <Grid item xs={4} className={css.containerDescription}>
        <Typography component="h5" className={css.descriptionTxt}>
          Create, share, and get feedback with collaborative sandboxes for rapid web development.
        </Typography>
      </Grid>

      <Grid item className={css.containerIcon}>
        <Link>
          <img src={reactjs} alt="reactjs" className={css.iconFrameWork} />
        </Link>
        <Link>
          <img src={angular} alt="angular" className={css.iconFrameWork} />
        </Link>
        <Link>
          <img src={javascript} alt="javascript" className={css.iconFrameWork} />
        </Link>
      </Grid>

      <Grid item className={css.containerBtn}>
        <Button className={css.btnCodeing} variant="contained" size="medium"
          onClick={() => {
            alert('clicked');
          }}>
          #!# Start coding for free
        </Button>
      </Grid>
    </Grid >

  );
};


export default IntroSection;
