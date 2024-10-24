import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import DrawerAppBar from '@/components/Layout/Header/NavBar';
import Footer from '@/components/Layout/Footer/Footer';
import Container from '@mui/material/Container';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.1/packages/wanted-sans/fonts/webfonts/variable/complete/WantedSansVariable.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
              <DrawerAppBar />
            
              {props.children}
              <Footer/>
            </Container>
            
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
