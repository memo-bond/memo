import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { alpha } from "@mui/material/styles";
import {
  colorPrimary,
  blue01,
  black01,
  white01,
} from "constants/colorsAndSize";

const colorText = alpha(white01, 0.87);

const styles = ({ spacing, breakpoints }: Theme) =>
  createStyles({
    root: {
      backgroundColor: blue01,
      width: "100%",
      top: 0,
      left: 0,
      zIndex: 1000,
      borderTop: "2px solid #8F90A6",
    },
    header: {
      display: "flex",
      height: "68px",
      textAlign: "center",
      alignContent: "center",
      justifyContent: "space-between",
      [breakpoints.down("sm")]: {
        height: "52px",
      },
    },
    navLeft: {
      maxWidth: "calc(100% - 80px)",
      lineHeight: "100%",
      paddingTop: "3px",
    },
    navRight: {
      paddingTop: '2px',
      display: 'flex',
      alignItems: 'center',
    },
    navLink: {
      alignItems: "center",
      "&:focus": {
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
      },
    },
    btn: {
      backgroundColor: "#FFF",
      "&:hover": {
        backgroundColor: "#FFF",
      },
      "& .Memo-MuiButton-label": {
        letterSpacing: "1.25px",
      },
    },
    logoLink: {
      display: "flex",
    },
    logo: {
      width: "40px",
      height: "40px",
      [breakpoints.up("md")]: {
        width: "52px",
        height: "52px",
      },
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
    },
    title: {
      fontSize: "14px",
      fontWeight: 400,
      letterSpacing: "0.15px",
      color: black01,
      marginLeft: spacing(2),
      [breakpoints.down("sm")]: {
        fontSize: "14px",
      },
      marginTop: 0,
    },

    hotline: {
      color: colorText,
      margin: 0,
      fontSize: "14px",
      lineHeight: "20px",
      textDecoration: "none",
    },
    contact: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "flex-end",
    },
    signup: {
      border : '1px solid',
      borderColor : colorPrimary,
      marginRight : '1rem',
      alignSelf: "center",
      color: white01,
      padding: '0 20px',
      marginLeft: "40px",
      ".MuiButton-root:hover": {
        backgroundColor: "white",
      },
    },
    codingBtn: {
      color: "#fff",
      fontWeight: "500 !important",
      fontSize: 14,
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
    container: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
    },
    burgerBtn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    navBtn: {
      borderRadius: "4px",
      fontSize: "15px",
      fontWeight: '600 !important' ,
      color: '#8F90A6',
      textTransform: "none",

      "&:hover": {
        textDecoration: "underline",
      },
      "&:focus": {
        color : white01,
      },
    },
    divVer: {
      width: "1px",
      height: "10px",
      margin: spacing(1),
      backgroundColor: "#fff",
    },
    forMemo: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      textAlign: "start",
    },
    forMemoTxt: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#FFF",
      marginTop: "-2px",
      marginLeft: spacing(2),
      [breakpoints.down("sm")]: {
        fontSize: "16px",
      },
    },
  });
const useStyles = makeStyles(styles, {
  index: 1,
  classNamePrefix: "ReviewSection",
});
export default useStyles;
