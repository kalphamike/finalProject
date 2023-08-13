import PropTypes from 'prop-types';
import React, { 
  useEffect, 
  useState 
} from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack, FormControl, Select, MenuItem } from '@mui/material';
// mock
import account from '../../../_mock/account';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import navConfig from './config';
import { AiFillSetting } from 'react-icons/ai';
import UserAccount from 'src/components/mycomp/UserAccount';

// ----------------------------------------------------------------------
const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  //backgroundColor: alpha(theme.palette.grey[500], 0.12),
  backgroundColor: '#f9fafb',
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
        backgroundColor: '#1d518a',
        //backgroundColor: '#090e12',
        color: 'white',
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'flex', justifyContent: 'center', marginLeft: '70px'}}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                <Avatar src={account.photoURL} alt="photoURL" />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                    {account.displayName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {account.role}
                  </Typography>
                </Box>
              </div>
              <button 
                onClick={()=> setDisplay(!display) } 
                style={{ padding: '0px', background: 'transparent' , border: '0', margin: '0' }}>
                <AiFillSetting />
              </button>
            </div>
            {
              display &&
              <div style={{ display: 'flex', marginTop: '0px', flexDirection: 'column', justifyContent: 'flex-start', width: '100%', }}>
                <UserAccount />
              </div>
            }
          </StyledAccount>
        </Link>
      </Box >
      
      <NavSection data={navConfig}  styled={{ color: 'white' }}/>
     
      <Box sx={{ flexGrow: 1}} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
          <LanguageSelector />
        </Stack>
      </Box>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

// LANGUAGE SELECTOR 
const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    const currentURL = window.location.href;
    if (currentURL === 'http://localhost:3013/dashboard/app') {
      setSelectedLanguage('en');
    }
  }, []);

  const handleChange = (event) => {
    setSelectedLanguage(event.target.value);
    if (event.target.value === 'rw') {
      window.location.href = 'http://localhost:3003/dashboard/app';
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