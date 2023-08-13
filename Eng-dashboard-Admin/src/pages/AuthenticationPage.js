import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import {
  Container,
  Typography,
  Divider,
  Stack,
  Button,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import useResponsive from '../hooks/useResponsive';
import Logo from '../components/logo';
import Iconify from '../components/iconify';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  position: 'relative',
  backgroundImage: 'url("/assets/home.jpg")',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    const currentURL = window.location.href;
    if (currentURL === 'http://localhost:3013/auth/signin') {
      setSelectedLanguage('en');
    }
  }, []);

  const handleChange = (event) => {
    setSelectedLanguage(event.target.value);
    if (event.target.value === 'rw') {
      window.location.href = 'http://localhost:3003/auth/signin';
    }
  };

  return (
    <FormControl
      sx={{
        position: 'fixed',
        bottom: 'calc(10% + 16px)',
        left: 16,
        zIndex: 9999,
      }}
    >
      <Select
        value={selectedLanguage}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Select language' }}
        
      >
        {selectedLanguage !== 'en' && (
          <MenuItem value="" disabled>
            {/* <img src="/assets/flags/placeholder.png" alt="Select language" style={{ marginRight: 8 }} /> */}
          </MenuItem>
        )}
        <MenuItem value="en">
          <img src="/assets/eng.svg" alt="English" style={{  width: '20px', height: '20px', marginRight: '8px' }} />
        </MenuItem>
        <MenuItem value="rw">
          <img src="/assets/kiny.svg" alt="Kinyarwanda" style={{  width: '20px', height: '20px', marginRight: '8px' }} />
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default function AuthenticationPage() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Login | Admin</title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back!
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Outlet />
          </StyledContent>
        </Container>

        <LanguageSelector />
      </StyledRoot>
    </>
  );
}
