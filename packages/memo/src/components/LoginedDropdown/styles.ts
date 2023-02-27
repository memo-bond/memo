import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { relative } from 'path';
import {
	colorPrimary,
	blue01,
	black01,
	white01,
} from "constants/colorsAndSize";
const styles = ({ spacing, breakpoints }: Theme) =>
	createStyles({
		dropdownMenuPaper: {
			backgroundColor: blue01
		},
		dropdownUserInfoItem: {
			backgroundColor: blue01,
			marginInline: 10
		},
	});

const useStyles = makeStyles(styles, { index: 1, classNamePrefix: 'LoginDropdown' });
export default useStyles;