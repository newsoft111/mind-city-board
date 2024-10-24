import React from 'react';
import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import LanguageIcon from '@mui/icons-material/Language';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Image from 'next/image'

const Footer = () => {
  return (
    <Box component="footer" sx={{ mt: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link 
                href="https://apps.apple.com/kr/app/%EB%A7%88%EC%9D%B8%EB%93%9C%EC%8B%9C%ED%8B%B0/id6450497438" 
                sx={{ mr: 1 }}
            >
                <Image src="/images/app-store.svg" alt="앱스토어" width={150} height={50} />
            </Link>
            <Link 
                href="https://play.google.com/store/apps/details?id=com.daineap.mindcity&hl=ko&gl=US&pli=1" 
            >   
                <Image src="/images/play-store.svg" alt="플레이스토어" width={150} height={50} />
                
            </Link>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          pb: 5
        }}>
          <Box>
            <IconButton color="primary" aria-label="website" sx={{ pl: '0' }}>
              <LanguageIcon />
            </IconButton>
            <IconButton color="primary" aria-label="youtube">
              <YouTubeIcon />
            </IconButton>
            <IconButton color="primary" aria-label="instagram">
              <InstagramIcon />
            </IconButton>
            <IconButton color="primary" aria-label="twitter">
              <TwitterIcon />
            </IconButton>
          </Box>

        
            <Box>
            <Typography variant="body2" color="text.secondary">
                COPYRIGHT (C) 2024 KOBOTIS ALL RIGHTS RESERVED
            </Typography>
            
            </Box>
        </Box>
    </Box>
  );
};

export default Footer;