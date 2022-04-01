import React from 'react';
import {
  Container, Grid, Typography, Link
} from '@mui/material';

import logo from 'assets/images/logo.svg';
import memo from 'assets/images/memo.svg';
import facebookIcon from 'assets/images/facebook.png';
import instagramIcon from 'assets/images/instagram.svg';
import twitterIcon from 'assets/images/twitter.svg';
import youtubeIcon from 'assets/images/youtube.svg';
import githubIcon from 'assets/images/github.png';
import gmailIcon from 'assets/images/gmail.png';
import useStyles from './styles';

const Footer = () => {
  const css = useStyles();

  return (
    <footer className={css.root}>
      <Container maxWidth="lg" fixed>
        <Grid container className={css.footer} spacing={3} >
          <Grid container xs={4} className={css.footerContainerLeft}>
            <Grid display="flex" item className={css.navLeft}>
              <Grid item className={css.logoContainer} >
                <Link aria-label="homepage" className={css.logoLink}>
                  <img src={logo} alt="logo" className={css.logo} />
                </Link>
                <Typography component="h3" className={css.memoTxt}>
                  Memo
                </Typography>
              </Grid>
            </Grid>

            <Grid item >
              <Typography component="h5" className={css.normalTxt}>
                © 2022 - All Rights Reserved
              </Typography>
            </Grid>
          </Grid>

          <Grid container xs={4} justifyContent="center" alignItems="center" alignContent="center">
            <Link aria-label="homepage" >
              <img src={memo} alt="memo" className={css.logoMemo} />
            </Link>
          </Grid>

          <Grid container xs={4} className={css.footerContainerRight}>
            <Grid display="flex" item className={css.navRight}>
   
              <Link>
                <img src={instagramIcon} alt="instagramIcon" className={css.iconContact} />
              </Link>
              <Link>
                <img src={twitterIcon} alt="twitterIcon" className={css.iconContact} />
              </Link>
              <Link>
                <img src={youtubeIcon} alt="youtubeIcon" className={css.iconContact} />
              </Link>
            </Grid>

            <Grid item display="flex" justifyContent="flex-end" >
              <Typography component="h5" className={css.normalTxt}>
                Terms and Conditions
              </Typography>

              <Typography component="h5" className={css.normalTxt}>
                Privacy Policy
              </Typography>

              <Typography component="h5" className={css.normalTxt}>
                Sitemap
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </footer>

  );
};


export default Footer;
