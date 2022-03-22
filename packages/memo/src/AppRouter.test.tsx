import React from 'react';
import { render } from './test-utils';
import AppRouter from 'AppRouter';

describe('AppRouter', () => {
  test('should render with crashing', () => {
    render(<AppRouter />);
  });
});
