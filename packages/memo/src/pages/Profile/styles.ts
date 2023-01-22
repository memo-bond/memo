import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const styles = ({ breakpoints }: Theme) =>
  createStyles({
    homeRoot: {
      textAlign: "center",
      margin: "auto",
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
    landingBody: {
      transition: "all 0.3s ease-in-out",
    },
    edit: {
      textAlign: "center",
      margin: "auto",
    },
  });
const useStyles = makeStyles(styles, { index: 1, classNamePrefix: "HomePage" });
export default useStyles;
