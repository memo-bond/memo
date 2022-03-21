import { createTheme, alpha } from '@mui/material/styles';
import { viVN } from '@mui/material/locale';
import {
  colorPrimary,
  colorSecondary,
  colorText,
  colorBg,
  black17,
  black12,
  SCREEN_BREAKPOINTS,
  black04,
  blue05,
  green_checked,
} from '../constants/colorsAndSize';

const primaryMain = colorPrimary;
const primaryDark = alpha(colorPrimary, 0.8);
const primaryLight = alpha(colorPrimary, 0.6);

const secondaryMain = colorSecondary;
const secondaryDark = alpha(colorSecondary, 0.8);
const secondaryLight = alpha(colorSecondary, 0.6);

const textPrimary = black17;
const textSecondary = black12;
const textDisable = black12;

const inputHeightSmall = '36px';
const inputHeightLarge = '48px';

const theme = createTheme(
  {
    breakpoints: {
      values: SCREEN_BREAKPOINTS,
    },
    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            width: 24,
            height: 24,
            fontSize: 24,
          },
          colorDisabled: {
            color: black12,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            top: 'inherit',
            overflowY: 'inherit',
          },
          paperAnchorDockedLeft: { borderRight: 'none' },
        },
      },
      MuiListItemIcon: {
        styleOverrides: { root: { minWidth: 24 } },
      },
      MuiPaper: {
        styleOverrides: { rounded: { borderRadius: 8 } },
      },
      MuiIcon: {
        styleOverrides: {
          root: {
            width: 24,
            height: 24,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          textPrimary: { color: colorPrimary },
          root: {
            textTransform: 'capitalize',
            height: inputHeightSmall,
            borderRadius: 8,
          },
          contained: {
            boxShadow: 'none',
          },
          containedSizeSmall: {
            height: inputHeightSmall,
          },
          outlinedSizeSmall: { height: inputHeightSmall },
          containedSizeLarge: { height: inputHeightLarge },
          outlinedSizeLarge: { height: inputHeightLarge },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor: black04,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            backgroundColor: '#fff',
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: blue05,
            textDecorationColor: 'initial',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: { root: {} },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'capitalize',
          },
        },
      },
      MuiFormControl: {
        styleOverrides: { marginNormal: { marginTop: 0, marginBottom: 0 } },
      },
      MuiTooltip: {
        styleOverrides: { popper: { zIndex: 1000 } },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            '&.Mui-checked': {
              color: green_checked,
            },
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            '&.Mui-checked': {
              color: green_checked,
            },
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontSize: 16,
            color: black17,
          },
        },
      },
    },
    palette: {
      background: { default: colorBg },
      divider: colorText,
      primary: {
        main: primaryMain,
        dark: primaryDark,
        light: primaryLight,
      },
      secondary: {
        main: secondaryMain,
        dark: secondaryDark,
        light: secondaryLight,
      },
      text: {
        primary: textPrimary,
        secondary: textSecondary,
        disabled: textDisable,
      },
    },
    spacing: 4,
    // props: {
    //   MuiButtonBase: {
    //     disableRipple: true,
    //   },
    // },
    typography: {
      fontSize: 14,
      fontFamily: '"SF Pro Text", sans-serif',
      fontWeightRegular: 'normal',
      body1: {
        fontSize: 14,
      },
      button: {
        fontSize: 14,
        color: textSecondary,
      },
      h2: {
        fontSize: 20,
        color: textPrimary,
        fontWeight: 'bold',
        marginBottom: 4,
        lineHeight: 1.2,
      },
      h3: {
        fontSize: 16,
        color: textPrimary,
        fontWeight: 'bold',
        lineHeight: 1.5,
      },
      h4: {
        fontSize: 16,
        color: textSecondary,
        fontWeight: 500,
        lineHeight: 1.71,
      },
      h5: {
        fontSize: 12,
        color: textSecondary,
        fontWeight: 'normal',
        lineHeight: 1.71,
      },
      h6: {
        fontSize: 10,
        fontWeight: 500,
        lineHeight: 1.6,
        color: textSecondary,
      },
    },
  },
  viVN,
);

export const spacing = theme.spacing;
export const breakpoints = theme.breakpoints;
export const mixins = theme.mixins;

export default theme;
