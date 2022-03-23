import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const styles = (theme: Theme) =>
  createStyles({
    root: {
     
    },
  });

const useStyles = makeStyles(styles, { index: 1, classNamePrefix: 'BannerSection' });
export default useStyles;
