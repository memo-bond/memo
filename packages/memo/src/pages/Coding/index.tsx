import { memo } from "react";
import { Provider } from "react-redux";
import { store } from "./state";
import CellList from "./components/cell-list";
import Header from "layout/Header";
import Footer from "layout/Footer";
import useStyles from "./styles";
import { Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

const CodingPageComponent = () => {
  const css = useStyles();
  const [memoId, setMemoId] = useState("");
  useEffect(() => {
    const a = window.location.pathname.split("-");
    const id = a[a.length - 1];
    if (id === "/code/") {
      // new
    } else {
      // edit
      setMemoId(id);
    }
  }, []);
  return (
    <div className={css.homeRoot}>
      <div id="sectionBody" className={css.landingBody}>
        <Header />
        <Provider store={store}>
          <div>
            <TextField label="Title" />
            <CellList memoId={memoId} />
          </div>
        </Provider>
        <Button>Create</Button>
        <Button>Update</Button>
        <Button>Delete</Button>
        <Footer />
      </div>
    </div>
  );
};
const CodingPage = memo(CodingPageComponent);
CodingPage.displayName = "CodingPage";
export default CodingPage;
