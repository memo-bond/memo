import React from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { StylesProvider, createGenerateClassName } from "@mui/styles";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "react-query";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { ReactQueryDevtools } from "react-query/devtools";
import theme from "theme";
import AppRouter from "AppRouter";
import { atom } from "recoil";
import { User } from "models/user";

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
