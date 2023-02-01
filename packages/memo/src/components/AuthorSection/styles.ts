import { createStyles, makeStyles } from "@mui/styles";
import { blue01, white01 } from "constants/colorsAndSize";

const styles = () =>
  createStyles({
    root: {
      backgroundColor: blue01,
      width: "100%",
      top: 0,
      left: 0,
      paddingTop: "5rem",
      zIndex: 1000,
      color: "white",
    },
    navBtn: {
      borderRadius: "4px",
      fontSize: "15px",
      fontWeight: "600 !important",
      color: "#8F90A6",
      textTransform: "none",

      "&:hover": {
        textDecoration: "underline",
      },
      "&:focus": {
        color: white01,
      },
    },
  });
const useStyles = makeStyles(styles, {
  index: 1,
  classNamePrefix: "ReviewSection",
});
export default useStyles;
