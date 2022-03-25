import React from 'react';
import {
  AppBar,
  Box, Container, Grid, Toolbar, Typography
  // IconButton,
  // Popover,
} from '@mui/material';

import { Link, useHistory } from 'react-router-dom';
import logo from 'assets/images/memo.png';
import facebookIcon from 'assets/images/facebook.png';
import instagramIcon from 'assets/images/instagram.png';
import twitterIcon from 'assets/images/twitter.png';
import youtubeIcon from 'assets/images/youtube.png';
import githubIcon from 'assets/images/github.png';
import gmailIcon from 'assets/images/gmail.png';
import useStyles from './styles';

const Footer = () => {
  const css = useStyles();

  return (
    <footer className={css.root}>
      <Grid container className={css.footer}>
        <Grid item className={css.logoContainer}>
          <Link aria-label="homepage" className={css.logoLink} to={''}>
            <img src={logo} alt="logo" className={css.logo} />
          </Link>
          <Typography component="h3" className={css.forMemoTxt}>
            Memo
          </Typography>
        </Grid>

      </Grid>
      <Grid container className={css.footerContainer} spacing={4}>
        <Grid item xs={3}>
          <Typography component="h3" className={css.titleTxt}>
            Services
          </Typography>
          <Typography component="h5" className={css.normalTxt}>
            Salesforce Health Cloud
          </Typography>
          <Typography component="h5" className={css.normalTxt}>
            Custom Software Engineering
          </Typography>
          <Typography component="h5" className={css.normalTxt}>
            Data Management and Analytics
          </Typography>
          <Typography component="h5" className={css.normalTxt}>
            Artificial Intelligence Enablement
          </Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography component="h3" className={css.titleTxt}>
            Solutions
          </Typography>
          <Typography component="h5" className={css.normalTxt}>
            Laboratory Information Systems
          </Typography>
          <Typography component="h5" className={css.normalTxt}>
            Custom Patient Cost Estimators
          </Typography>
          <Typography component="h5" className={css.normalTxt}>
            Custom Patient Portals
          </Typography>
          <Typography component="h5" className={css.normalTxt}>
            Custom Order and Results Portal
          </Typography>
          <Typography component="h5" className={css.normalTxt}>
            Data-Driven Revenue Cycle Operations
          </Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography component="h3" className={css.titleTxt}>
            More
          </Typography>
          <Typography component="h5" className={css.normalTxt}>
            Privacy Policy
          </Typography>
        </Grid>

        <Grid item xs={3} className={css.contactUs}>
          <Typography component="h3" className={css.titleTxt}>
            Contact Us
          </Typography>
          <Link to={''}>
            <img src={facebookIcon} alt="facebookIcon" className={css.iconContact} />
          </Link>
          <Link to={''} >
            <img src={instagramIcon} alt="instagramIcon" className={css.iconContact} />
          </Link>
          <Link to={''}>
            <img src={twitterIcon} alt="twitterIcon" className={css.iconContact} />
          </Link>
          <Link to={''}>
            <img src={youtubeIcon} alt="youtubeIcon" className={css.iconContact} />
          </Link>
          <Link to={''}>
            <img src={githubIcon} alt="githubIcon" className={css.iconContact} />
          </Link>
          <Link to={''}>
            <img src={gmailIcon} alt="gmailIcon" className={css.iconContact} />
          </Link>
        </Grid>
      </Grid>
    </footer>

  );
};


export default Footer;
