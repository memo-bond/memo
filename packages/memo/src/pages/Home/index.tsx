import BannerSection from "components/BannerSection";
import IntroSection from "components/IntroSection";
import ReviewSection from "components/ReviewSection";
import Footer from "layout/Footer";
import Header from "layout/Header";
import React, { memo } from "react";
import useStyles from "./styles";
import logo from "assets/images/logo.svg";
import CodingSection from "components/CodingSection";

const HomePageComponent = () => {
  const css = useStyles();
  return (
    <div className={css.homeRoot}>
      <div id="sectionBody" className={css.landingBody}>
        <Header />
        <BannerSection />
        {/* <IntroSection /> */}
        {/* <ReviewSection /> */}
        <CodingSection />
        <Footer />
      </div>
    </div>
  );
};
const HomePage = memo(HomePageComponent);
HomePage.displayName = "HomePage";
export default HomePage;
