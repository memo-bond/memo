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
    landingBody: {
      transition: "all 0.3s ease-in-out",
    },
    codingBtn: {
      color: "#fff",
      fontWeight: "500 !important",
      fontSize: 14,
      height: "32px",
      lineHeight: "22px",
      minWidth: "8rem",
      maxWidth: "9rem",
      padding: "15px 20px",
      borderRadius: "8px",
      textTransform: "none",
      backgroundImage: "linear-gradient(to right bottom, #FF3B3B, #6600CC)    ",
      "&:hover": {
        backgroundColor: "#fff",
      },
      "&:focus": {
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
      },
    },
  });
const useStyles = makeStyles(styles, { index: 1, classNamePrefix: "HomePage" });
export default useStyles;
