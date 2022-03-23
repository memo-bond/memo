import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { colorPrimary, pink01, black01, white01 } from 'constants/colorsAndSize';
const colorText = alpha(white01, 0.87);

const styles = ({ spacing, breakpoints }: Theme) =>
  createStyles({
    root: {
      backgroundColor: pink01,
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
      borderTop: '2px solid #d82d8b',
    },
    header: {
      display: 'flex',
      height: '68px',
      textAlign: 'center',
      alignContent: 'center',
      justifyContent: 'space-between',
      [breakpoints.down('sm')]: {
        height: '52px',
      },
    },
    btn: {
      backgroundColor: '#FFF',
      '&:hover': {
        backgroundColor: '#FFF',
      },
      '& .Memo-MuiButton-label': {
        letterSpacing: '1.25px',
      },
    },
    logoLink: {
      display: 'flex',
    },
    logo: {
      width: '40px',
      height: '40px',
      [breakpoints.up('md')]: {
        width: '52px',
        height: '52px',
      },
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    title: {
      fontSize: '14px',
      fontWeight: 400,
      letterSpacing: '0.15px',
      color: black01,
      marginLeft: spacing(2),
      [breakpoints.down('sm')]: {
        fontSize: '14px',
      },
      marginTop: 0,
    },

    hotline: {
      color: colorText,
      margin: 0,
      fontSize: '14px',
      lineHeight: '20px',
      textDecoration: 'none',
    },
    contact: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    signup: {
      backgroundColor: 'white',
      alignSelf: 'center',
      color: colorPrimary,
      marginLeft: '40px',
      '.MuiButton-root:hover': {
        backgroundColor: 'white',
      },
    },
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    burgerBtn: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    signinBtn: {
      borderRadius: '4px',
      fontSize: '14px',
      fontWeight: 400,
      color: black01,
      textTransform: 'none',

      '&:hover': {
        textDecoration: 'underline',
      },
    },
    divVer: {
      width: '1px',
      height: '10px',
      margin: spacing(1),
      backgroundColor: '#fff',
    },
    forMemo: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      textAlign: 'start',
    },
    forMemoTxt: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#FFF',
      marginTop: '-2px',
      marginLeft: spacing(2),
      [breakpoints.down('sm')]: {
        fontSize: '16px',
      },
    },
  });
const useStyles = makeStyles(styles, { index: 1, classNamePrefix: 'HeaderLanding' });
export default useStyles;
