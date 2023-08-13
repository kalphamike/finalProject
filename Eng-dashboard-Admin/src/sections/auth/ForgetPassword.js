import React, { useEffect, useState } from 'react';
import { Stack, Typography, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../components/iconify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// ----------------------------------------------------------------------

export default function ForgetPassword() {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [updating2, setUpdating2] = useState('');
  const [notification, setNotification] = useState({ message:'', type:'' });
 
  const handleInputs = ({currentTarget: input}) => {
    setEmail(input.value);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.length === 0) { 
      setNotification({ message: 'Imeli yawe irakenewe', type: 'error'});
      setOpen(true);
      return;
    } else {
      setUpdating2('Birigusabwa ...');
      axios.post(`http://localhost:5000/api/user/requestPasswordReset`, { email: email, role: 'Admin' } )
      .then(response => { 
        setTimeout(() => {
          setUpdating2('');
          setOpen(false);
          window.location.replace("/auth/signin");
        }, 3000)
      })
      .catch(error => {
        if(error.response && error.response.status >= 400 && error.response.status <= 500 ){
          setNotification({ message: 'Invalid email or password', type: 'error'});
          setOpen(true);
        }
      })
    }
  }

  return (
    <>
      <Typography variant="h4" gutterBottom color={'white'}>Enter your Email</Typography>
      <Typography>{error && <Alert severity="error">{error}</Alert>}</Typography>
      
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField name="email" value={email} onChange={handleInputs} label="Email address" />
        </Stack>
        <Typography variant="body2" sx={{ mb: 5 }} color={'white'}>Go back to Login page,{''}
          <Link to={'/auth/signin'}> Click me</Link>
        </Typography>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" sx={{marginTop: 5}}>Submit</LoadingButton>
      </form>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={notification.type} sx={{ width: '100%' }}>{notification.message}</Alert>
      </Snackbar>
    </>
  );
}
