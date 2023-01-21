import Footer from "layout/Footer";
import Header from "layout/Header";
import { memo } from "react";
import useStyles from "./styles";
import { Box } from "@mui/material";
import CellList from "./components/cell-list";

// import Header from 'pages/Home/Header';
// import Footer from 'pages/Home/Header';

const CodingPageComponent = () => {
  const css = useStyles();
  return (
    <div className={css.homeRoot}>
      <Header />
      <Box className={css.codingBox}>
        <CellList />
      </Box>
      <Footer />
    </div>
  );
};
const CodingPage = memo(CodingPageComponent);
CodingPage.displayName = "HomePage";
export default CodingPage;
