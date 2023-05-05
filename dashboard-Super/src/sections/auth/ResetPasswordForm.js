import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { Stack, IconButton, Typography, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../components/iconify';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// ----------------------------------------------------------------------

export default function ResetPasswordForm() {
  const [open, setOpen] = React.useState(false);
  const params = useParams();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({password: '', confirmPassword: ''});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [notification, setNotification] = useState({ message:'', type:'' })

  const handleInputs = ({currentTarget: input}) => {
    setUser({...user, [input.name]: input.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.password) {
      setNotification({ message: 'Password is required' , type: 'error'});
      setOpen(true);
      return;
    } else if(!user.confirmPassword) {
      setNotification({ message: 'You must confirm the password' , type: 'error'});
      setOpen(true);
      return;
    } else if(user.password !== user.confirmPassword) {
      setNotification({ message: 'Passwords do not match' , type: 'error'});
      setOpen(true);
      return;
    } else { 
      setError("");
      axios.post(`http://localhost:5000/api/user/resetPassword?id=${params.userId}&token=${params.token}`, user)
      .then(response => {
        if(response.data.status === 401) {
          setNotification({ message: response.data , type: 'error'});
          setOpen(true);
          console.log(response.data);
          return;
        } else {
          //Checking user role
          window.location = '/auth/signin';
        }
      })
      .catch(error => {
        setNotification({ message: error, type: 'error'});
        setOpen(true);
        console.log(error);
      })
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Hindura ijambo ry'ibanga
      </Typography>
      <Typography>
        {error &&
          <Alert severity="error">{error}</Alert>
        }
      </Typography>

      <form onSubmit={handleSubmit}>
        
        <Stack spacing={3}>
          <TextField name="password" value={user.password} onChange={handleInputs} label="Create Password" type={showPassword ? 'text' : 'password'} InputProps={{endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
              </IconButton>
            </InputAdornment>
          ),}}/>
          <TextField name="confirmPassword" value={user.confirmPassword} onChange={handleInputs} label="Confirm Password" type={showPassword ? 'text' : 'password'} InputProps={{endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
              </IconButton>
            </InputAdornment>
          ),}}/>
        </Stack>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" sx={{marginTop: 5}}>
          Hindura ijambo ry'ijambo
        </LoadingButton>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={notification.type} sx={{ width: '100%' }}>{notification.message}</Alert>
      </Snackbar>
    </>
  );
}
