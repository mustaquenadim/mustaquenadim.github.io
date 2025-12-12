'use client';

import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '@styles';

export default function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
