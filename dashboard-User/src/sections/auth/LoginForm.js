import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, Typography, InputAdornment, TextField, Checkbox } from '@mui/material';
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

export default function LoginForm() {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({email: '', password: ''});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [notification, setNotification] = useState({ message:'', type:'' })

  const handleInputs = ({currentTarget: input}) => {
    setUser({...user, [input.name]: input.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.email) {
      setNotification({ message: 'Email is required' , type: 'error'});
      setOpen(true);
      return;
    } else if(!user.password) {
      setNotification({ message: 'Password is required' , type: 'error'});
      setOpen(true);
      return;
    } else {
      setError("");
      axios.post('http://localhost:5000/api/user/signin', user)
      .then(response => {
        if(response.data.status === 401) {
          setNotification({ message: response.data , type: 'error'});
          setOpen(true);
          console.log(response.data);
          return;
        } else {
          //Checking user role
          if(response.data.user.role === 'Agent') {
            window.location = '/dashboard/app';
            localStorage.setItem('userToken', response.data.token);
            localStorage.setItem('userEmail', response.data.user.email);
            localStorage.setItem('userName', response.data.user.name);
            localStorage.setItem('userPhone', response.data.user.phone);
            localStorage.setItem('userLocation', response.data.user.province+", "+response.data.user.district+", "+response.data.user.sector+", "+response.data.user.cell);
            localStorage.setItem('userRole', response.data.user.role);
            localStorage.setItem('id', response.data.user._id);
          } else if(response.data.user.role === 'Admin') {
            window.location = 'http://localhost:3003/dashboard/app';
            localStorage.setItem('adminToken', response.data.token);
            localStorage.setItem('adminEmail', response.data.user.email);
            localStorage.setItem('adminName', response.data.user.name);
            localStorage.setItem('userRole', response.data.user.role);
            localStorage.setItem('id', response.data.user._id);
          }else if(response.data.user.role === 'Supervisor'){
            window.location = 'http://localhost:3002/dashboard/app';
            localStorage.setItem('supervisorToken', response.data.token);
            localStorage.setItem('supervisorEmail', response.data.user.email);
            localStorage.setItem('supervisorName', response.data.user.name);
            localStorage.setItem('userRole', response.data.user.role);
            localStorage.setItem('id', response.data.user._id);
          }s
          // setNotification({ message: 'Log', type: 'success'})  
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
        Injira kuri Child Rights System
      </Typography>
      {/* <Typography variant="body2" sx={{ mb: 5 }}>
        Don’t have an account? {''}
        <Link to={'/auth/signup'}>Get Started</Link>
      </Typography> */}
      <Typography>
        {error &&
          <Alert severity="error">{error}</Alert>
        }
      </Typography>

      <form onSubmit={handleSubmit}>
        
        <Stack spacing={3}>
          <TextField name="email" value={user.email} onChange={handleInputs} label="Email address" />
          <TextField name="password" value={user.password} onChange={handleInputs} label="Password" type={showPassword ? 'text' : 'password'} InputProps={{endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
              </IconButton>
            </InputAdornment>
          ),}}/>
          <Typography variant="body2" sx={{ mb: 5 }}>
        Wibagiwe ijambo ry'ibanga,{''}
        <Link to={
        // /auth/signup
        '#'}> Kanda hano</Link>
      </Typography>
        </Stack>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" sx={{marginTop: 5}}>
          Emeza
        </LoadingButton>
        
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={notification.type} sx={{ width: '100%' }}>{notification.message}</Alert>
      </Snackbar>
    </>
  );
}
