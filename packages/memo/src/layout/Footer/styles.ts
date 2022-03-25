import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { color, fontFamily, fontSize, letterSpacing, lineHeight } from '@mui/system';

const styles = ({ spacing, breakpoints }: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#454545',
      position: "static",
    },
    footer: {
      display: 'flex',
      textAlign: 'center',
      alignContent: 'center',
      justifyContent: 'space-between',
      marginLeft: 20,
      [breakpoints.down('sm')]: {
        height: '52px',
      },
    },
    logo: {
      width: 50,
      height: 50,
      [breakpoints.up('md')]: {
        width: '52px',
        height: '52px',
      },

    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '30px',
      marginLeft: spacing(2),
    },

    logoLink: {
      display: 'flex',
    },
    forMemoTxt: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#FFF',
      marginTop: '-2px',
      fontFamily: 'Avenir-Heavy',
      marginLeft: spacing(2),
      [breakpoints.down('sm')]: {
        fontSize: '16px',
      },
    },

    footerContainer: {
      marginTop: 5,
      marginLeft: spacing(5),
      display: 'flex',
      [breakpoints.down('sm')]: {
        fontSize: '20px',
      },
    },
    titleTxt: {
      color: '#6172a1',
      fontSize: '17px',
      fontWeight: 'bold',
      marginTop: '15px',
      marginBottom: '16px',
      fontFamily: 'Avenir-Heavy',
      letterSpacing: '-0.03px',
      textAlign: 'left',
      marginLeft: spacing(2),
      [breakpoints.down('sm')]: {
        fontSize: '16px',
      },
    },

    normalTxt: {
      color: '#bfc3e9',
      fontSize: '15px',
      fontFamily: 'Avenir-Medium',
      letterSpacing: '-0.03px',
      lineHeight: '33px',
      marginLeft: spacing(2),
      [breakpoints.down('sm')]: {
        fontSize: '12px',
      },

    },

    contactUs: {
      [breakpoints.down('sm')]: {
        marginLeft: 2,
      },
    },

    iconContact: {
      width: 25,
      height: 25,
      marginLeft: spacing(2),
      [breakpoints.down('sm')]: {
        width: 15,
        height: 15,
      },
    },
  });

const useStyles = makeStyles(styles, { index: 1, classNamePrefix: 'Footer' });
export default useStyles;
