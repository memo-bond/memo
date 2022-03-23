import BannerSection from 'components/BannerSection';
import IntroSection from 'components/IntroSection';
import ReviewSection from 'components/ReviewSection';
import Footer from 'layout/Footer';
import Header from 'layout/Header';
import React, { memo } from 'react';
import useStyles from './styles';

// import Header from 'pages/Home/Header';
// import Footer from 'pages/Home/Header';


const HomePageComponent = () => {
  const css = useStyles();
  return (
    <div className={css.homeRoot}>
      <div id="sectionBody" className={css.landingBody}>
        <Header />
        <BannerSection />
        <IntroSection />
        <ReviewSection />
        <Footer />
      </div>
    </div>
  );
};
const HomePage = memo(HomePageComponent);
HomePage.displayName = 'HomePage';
export default HomePage;
