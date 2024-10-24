'use client';

import { createTheme, Theme } from '@mui/material/styles';


const baseTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#e4f3ff',
    },
    primary: {
      main: '#68a5fe',
    },
  },
  typography: {
    fontFamily: '"Wanted Sans Variable", sans-serif',
  },
});



const theme = createTheme({
  ...baseTheme,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#e4f3ff',
        },
      },
    },
    
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#68a5fe', 
          fontWeight: 'bold',
          backgroundColor: '#fff',
          border: 'none',
          borderRadius: '10px',
          '&:hover': {
            backgroundColor: '#fff',
            boxShadow: 'none',
          },
          fontSize: 18, // 기본 폰트 크기
          '@media (max-width:960px)': {
            fontSize: 14,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#68a5fe',
          fontWeight: 'bold',
          border: 'none',
          fontSize: 18,
          '@media (max-width:960px)': {
            fontSize: 14,
          },
        },
        body: {
          fontWeight: '500',
          fontSize: 18,
          '@media (max-width:960px)': {
            fontSize: 14,
          },
        },
      },
    },
    
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          width: '30px',
          height: '30px',
          fontSize: '14px',
          color: '#68a5fe',
          borderRadius: '4px',
          margin: '0 4px',
          backgroundColor: "#fff",
          '&.Mui-selected': {
            border: '1px solid #68a5fe',
            backgroundColor: '#fff',
            '&:hover': {
              backgroundColor: '#fff',
            },
          },
          '&:hover': {
            backgroundColor: '#fff',
          },

        },
      },
    },
  },
});

export default theme;