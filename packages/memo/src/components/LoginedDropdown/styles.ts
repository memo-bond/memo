import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const styles = ({ spacing, breakpoints }: Theme) =>
  createStyles({
      logoLink: {
          display: "flex",
      },
      logo: {
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
          width: "40px",
          height: "40px",
          overflow: "hidden",
          borderRadius: 150 / 2,
          border: 10,
          padding: "2px"
//          [breakpoints.up("md")]: {
//              width: "52px",
//              height: "52px",
//          },
      },
      logoContainer: {
          display: "flex",
          alignItems: "center",
      },
  });

const useStyles = makeStyles(styles, { index: 1, classNamePrefix: 'BannerSection' });
export default useStyles;