import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import {
  colorPrimary,
  blue01,
  black01,
  white01,
  purple6600
} from "constants/colorsAndSize";

const styles = ({ spacing, breakpoints }: Theme) =>
  createStyles({
    root: {
      backgroundColor: blue01,
      display: 'flex',
      paddingTop: '5rem',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      textAlign: 'center',
    },

    titleTxt: {
      paddingTop: '50px',
      fontSize: '36px',
      lineHeight: '28px',
      color: white01,
      fontWeight: 'bold',
      [breakpoints.down('sm')]: {
        fontSize: '20px',
      },
    },

    containerDescription: {
      marginTop: spacing(5),
      marginLeft: '30px',
      marginRight: '30px',
    },

    descriptionTxt: {
      fontSize: '18px',
      lineHeight: '24px',
      color: '#8F90A6',
      [breakpoints.down('sm')]: {
        fontSize: '14px',
      },
    },

    containerIcon: {
      display: 'flex',
      marginTop: spacing(5),
      alignContent: "space-between",
      justifyContent: "space-between"
    },

    iconFrameWork: {
      width: '45px',
      height: '45px',
      marginRight: spacing(5),
      [breakpoints.down('sm')]: {
        width: '30px',
        height: '30px',
      },
    },

    containerBtn: {
      marginTop: spacing(5),
      marginBottom: spacing(5),
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },

    btnCodeing: {
      backgroundColor: purple6600,
      backgroundImage: "",
      "&:hover": {
        backgroundColor: purple6600,
      },
      "&:focus": {
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
      contrastText: white01,
      fontSize: '14px',
      padding: "15px 20px",
      borderRadius: "8px",
      textTransform: "none",
      [breakpoints.down('sm')]: {
        fontSize: '12px',
      },
    },
  });

const useStyles = makeStyles(styles, { index: 1, classNamePrefix: 'BannerSection' });
export default useStyles;
