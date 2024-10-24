"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image'

interface NavItem {
  label: string
  href: string
}

const navItems: Array<NavItem> = [
  {
    label: '자유게시판',
    href: '/board/free',
  },
  {
    label: '마인드톡',
    href: '/board/mind-talk',
  },
]

export default function DrawerAppBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Box sx={{ mb: '20px' }}>
      <CssBaseline />
      <Container maxWidth="lg" disableGutters>
        <AppBar component="nav" position="static" 
          sx={{ 
          borderBottomRightRadius: '16px',
          borderBottomLeftRadius: '16px',
          boxShadow: '0 5px 10px rgba(104, 165, 254, 0.3)'
        }}>
          <Toolbar sx={{ 
            flexDirection: 'column', 
            alignItems: 'center', 
            py: 2, 
            position: 'relative', 
            minHeight: '160px',
          }}>
            
            <Box sx={{
              position: 'absolute',
              top: '20px', 
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1, 
            }}>
              <Image src="/images/logo.svg" alt="Logo" width={100} height={100} />
            </Box>

            <Box sx={{ 
              alignSelf: 'flex-end', 
              mt: 'auto',
              pt: { xs: '120px', md: '70px' },
            }}>
              {navItems.map((item) => (
                <Button 
                  key={item.label}
                  onClick={() => router.push(item.href)}
                  sx={{
                    borderBottom: pathname === item.href ? '2px solid #68a5fe' : 'none',
                    borderRadius: 0,
                    padding: '6px 12px',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: '#68a5fe',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </Container>
    </Box>
  );
}