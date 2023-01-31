import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { StylesProvider, createGenerateClassName } from "@mui/styles";
import { SnackbarProvider } from "notistack";
import { QueryClient } from "react-query";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import theme from "theme";
import AppRouter from "AppRouter";

const generateClassName = createGenerateClassName({
  seed: "Memo",
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: false,
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
});

const App = () => (
  <StylesProvider generateClassName={generateClassName}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={1}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools initialIsOpen={false} /> */}
            <BrowserRouter basename="/">
              <AppRouter />
            </BrowserRouter>
            {/* </QueryClientProvider> */}
          </LocalizationProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </StylesProvider>
);

export default App;
