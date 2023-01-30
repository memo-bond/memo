import { memo } from "react";
import { Provider } from "react-redux";
import { store } from "./state";
import CellList from "./components/cell-list";
import Header from "layout/Header";
import Footer from "layout/Footer";
import useStyles from "./styles";

const CodingPageComponent = () => {
  const css = useStyles();
  return (
    <div className={css.homeRoot}>
      <div id="sectionBody" className={css.landingBody}>
        <Header />
        <Provider store={store}>
          <div>
            <CellList />
          </div>
        </Provider>
        <Footer />
      </div>
    </div>
  );
};
const CodingPage = memo(CodingPageComponent);
CodingPage.displayName = "CodingPage";
export default CodingPage;
