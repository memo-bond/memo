import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { color, fontFamily, fontSize, letterSpacing, lineHeight } from '@mui/system';

const styles = ({ spacing, breakpoints }: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#1C1C28',
      position: "static",
      top: 0,
      left: 0,
      // borderTop: "2px solid #8F90A6",
    },

    navLeft: {
      maxWidth: "calc(100% - 80px)",
      lineHeight: "100%",
      paddingTop: "30px",
      justifyContent: 'flex-start',

    },

    navRight: {
      paddingTop: '30px',
      display: 'flex',
      justifyContent: 'flex-end',
      // marginRight: '2px',
      marginRight: spacing(2),

    },

    navLink: {
      alignItems: "center",
      "&:focus": {
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
      },
    },

    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: "space-between",
      marginLeft: spacing(1),
      marginRight: spacing(1),
      marginTop: spacing(1),
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
      display: 'flex',
      alignItems: 'center',
    },

    logoLink: {
      display: 'flex',
    },

    memoTxt: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#FFF',
      marginTop: '-2px',
      fontFamily: 'Inter',
      marginLeft: spacing(2),
      [breakpoints.down('sm')]: {
        fontSize: '16px',
      },
    },

    footerContainerLeft: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },

    footerContainerRight: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },

    normalTxt: {
      color: '#8F90A6',
      fontSize: '14px',
      fontFamily: 'Inter',
      letterSpacing: '-0.03px',
      lineHeight: '17px',
      marginLeft: spacing(2),
      marginBottom: '22px',
      marginTop: '30px',
      textAlign: 'left',
      [breakpoints.down('sm')]: {
        fontSize: '12px',
        marginTop: '10px',
      },

    },

    iconContact: {
      width: 25,
      height: 25,
      marginRight: spacing(2),
      [breakpoints.down('sm')]: {
        width: 15,
        height: 15,
      },
    },

    logoMemo: {
      width: "60px",
      height: "60px",
      [breakpoints.up("md")]: {
        width: "75px",
        height: "75px",
      },
      [breakpoints.down('sm')]: {
        width: "36px",
        height: "36px",
      },
    },
  });

const useStyles = makeStyles(styles, { index: 1, classNamePrefix: 'Footer' });
export default useStyles;
