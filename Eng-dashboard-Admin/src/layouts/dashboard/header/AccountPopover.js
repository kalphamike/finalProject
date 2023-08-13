import { useEffect, useState } from 'react';
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover, FormControl, Select } from '@mui/material';
import account from '../../../_mock/account';
import { AiFillSetting } from 'react-icons/ai';
import { FaSignOutAlt } from 'react-icons/fa';


export default function AccountPopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('supervisorName');
    localStorage.removeItem('adminPhone');
    localStorage.removeItem('userRole');
    localStorage.removeItem('adminLocation');
    localStorage.removeItem('id');
    window.location = '/auth/signin';
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover open={Boolean(open)} anchorEl={open} onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { p: 0, mt: 1.5, ml: 0.75, width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account.displayName}
          </Typography>
          <hr/>
          <Typography variant="body2"  sx={{ color: 'text.secondary', fontSize: '10px' }} noWrap>
            {account.email}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '10px' }} noWrap>
            {account.role}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '10px' }} noWrap>
            {account.Userlocation}
          </Typography>
        </Box>

        {/* <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack> */}

        {/* <MenuItem 
          // onClick={} 
          sx={{ m: 1 }}><AiFillSetting />&nbsp;&nbsp; Settings</MenuItem> */}

        <MenuItem onClick={handleLogout} sx={{ m: 1,  color:'red' }}><FaSignOutAlt />&nbsp;&nbsp; Logout</MenuItem>
      </Popover>
    </>
  );
}
