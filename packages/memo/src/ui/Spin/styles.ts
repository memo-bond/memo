import { Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';

const styles = (theme: Theme) =>
  createStyles({
    rootSpin: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: theme.zIndex.modal - 10,
      backgroundColor: 'rgba(255,255,255,0.6)',
    },
    childrenWrapper: {
      '&$loading': {
        opacity: 0.5,
      },
    },
    progressWrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'none',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: theme.zIndex.modal,
      '&$loading': {
        display: 'flex',
      },
    },
    loading: {},
  });

const useStyles = makeStyles(styles, { index: 1, classNamePrefix: 'Spin' });

export default useStyles;
