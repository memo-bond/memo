import Footer from 'layout/Footer';
import Header from 'layout/Header';
import React, { memo } from 'react';
import useStyles from './styles';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';

// import Header from 'pages/Home/Header';
// import Footer from 'pages/Home/Header';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const HomePageComponent = () => {
  const css = useStyles();
  return (
    <div className={css.homeRoot}>
      <div id="sectionBody" className={css.landingBody}>
        <Grid container spacing={2}>
          <Grid item xs={24}>
            <Item>
              <Header />
            </Item>
          </Grid>
          <Grid item xs={24}>
            <Item>
              <p>Rating Memo 💝</p>
              <Rating
                name="simple-controlled"
                value={5}
              />
            </Item>
          </Grid>
          <Grid item xs={24}>
            <Item>
              <Footer />
            </Item>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
const HomePage = memo(HomePageComponent);
HomePage.displayName = 'HomePage';
export default HomePage;
