import React from 'react';
import {
  ListItemProps,
  Box,
  Link,
  Hidden,
  Grid,
  Container,
  ListItem,
  Typography,
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
  const css = useStyles();

  return (
    <header className={css.root}>
      <Container maxWidth="lg" fixed>
        <Grid container className={css.header}>
          <Grid item className={css.logoContainer}>
            <Link aria-label="homepage" className={css.logoLink}>
              {/* <img src={logo} alt="logo" className={css.logo} /> */}
            </Link>
            <Typography component="h3" className={css.forMemoTxt}>
              Memo
            </Typography>
          </Grid>
          <Hidden mdUp>
            <Grid item xs={2} md={8} className={css.burgerBtn}>
              {/* <Menu /> */}
            </Grid>
          </Hidden>

          <Hidden smDown>
            <Box display="flex" alignItems="center">
              <Button className={css.signinBtn} variant="text" size="small" >
                Register
              </Button>
              <div className={css.divVer} />
              <Button variant="text" size="small" className={css.signinBtn} >
                Login
              </Button>
            </Box>
          </Hidden>
        </Grid>
      </Container>
      </header>

  );
};


export default Header;
