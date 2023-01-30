import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { white01 } from "constants/colorsAndSize";

const styles = ({ spacing, breakpoints }: Theme) =>
  createStyles({
    textWhite: {
      color: "white",
    },
  });
const useStyles = makeStyles(styles, {
  index: 1,
  classNamePrefix: "ReviewSection",
});
export default useStyles;
