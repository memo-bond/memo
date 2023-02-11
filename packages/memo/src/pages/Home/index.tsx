import BannerSection from "components/BannerSection";
import Footer from "layout/Footer";
import Header from "layout/Header";
import { memo } from "react";
import useStyles from "./styles";
import CodingSection from "components/CodingSection";
import AuthorSection from "components/AuthorSection";
import { Button, Grid, Typography } from "@mui/material";
import IntroSection from "components/IntroSection";

const HomePageComponent = () => {
  const css = useStyles();
  return (
    <div className={css.homeRoot}>
      <div id="sectionBody" className={css.landingBody}>
        <Header />
        <BannerSection />
        <IntroSection />
        <Grid
          style={{
            display: "flex",
            maxWidth: "120rem",
            margin: "auto",
            borderRadius: "16px",
          }}
          alignItems="center"
          justifyContent="center"
          container
          spacing={2}
        >
          <Grid item>
            <Button>Top Memo</Button>
            <CodingSection />
          </Grid>
          <Grid item>
            <Button>Top Author</Button>
            <AuthorSection />
          </Grid>
        </Grid>

        <Footer />
      </div>
    </div>
  );
};
const HomePage = memo(HomePageComponent);
HomePage.displayName = "HomePage";
export default HomePage;
