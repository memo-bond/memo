import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { colorSecondary, black12, white01, MIN_WIDTH } from 'constants/colorsAndSize';


const styles = (theme: Theme) =>
  createStyles({
  
  });

const useStyles = makeStyles(styles, { index: 1, classNamePrefix: 'Header' });
export default useStyles;
