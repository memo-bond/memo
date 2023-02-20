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

		logoLink: {
			display: "flex",
		},
		logo: {
			marginLeft: "auto",
			marginRight: "auto",
			display: "block",
			// width: "40px",
			// height: "40px",
			// overflow: "hidden",
			border: 10,
			borderWidth: 10,
			borderColor: "white"
		},
		logoContainer: {
			display: "flex",
			alignItems: "center",
		},
		dropdownBtn: {
			marginLeft: 10,
			position: "relative"
		},
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