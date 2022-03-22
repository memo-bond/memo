import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StylesProvider, createGenerateClassName } from '@mui/styles';
import { RecoilRoot } from 'recoil';

const theme = createTheme();

const generateClassName = createGenerateClassName({
  seed: 'MomoPortal',
});

const AllTheProviders: FC = ({ children }) => (
  <StylesProvider generateClassName={generateClassName}>
    <ThemeProvider theme={theme}>
      <RecoilRoot>{children}</RecoilRoot>
    </ThemeProvider>
  </StylesProvider>
);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { renderHook, act } from '@testing-library/react-hooks';

export { customRender as render };
