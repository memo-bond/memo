import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const styles = ({ breakpoints }: Theme) =>
  createStyles({
    homeRoot: {
      overflowX: "hidden",
      overflowY: "hidden",
      backgroundColor: "#28293D",
      paddingTop: "68px",
      [breakpoints.down("sm")]: {
        paddingTop: "52px",
      },
      "& button": {
        textTransform: "none",
        fontWeight: "bold",
      },
      "& .btn-small": {
        fontWeight: "normal",
        height: 28,

        "& svg": {
          width: 16,
          height: 16,
        },
      },
    },
    codingBox: {
      width: "80%",
      height: 1200,
      backgroundColor: "primary.dark",
      "&:hover": {
        backgroundColor: "primary.main",
        opacity: [0.9, 0.8, 0.7],
      },
    },
  });
const useStyles = makeStyles(styles, { index: 1, classNamePrefix: "HomePage" });
export default useStyles;
