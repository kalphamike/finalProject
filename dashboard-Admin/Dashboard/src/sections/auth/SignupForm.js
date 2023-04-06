import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, Typography, InputAdornment, TextField, Checkbox, NativeSelect, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../components/iconify';
import { Link } from 'react-router-dom';
import { districts, sectors, cells } from './Locations';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function SignUpForm() {
  const navigate = useNavigate();
  const [ showPassword, setShowPassword] = useState(false);

  const [signinData, setSigninData] = useState({
    name: '',
    phone: '',
    email: '',  
    role: 'Admin',
    province: '',
    district: '',
    sector:'',
    cell: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const updateData = ({currentTarget: input}) => {
    setSigninData({...signinData, [input.name]: input.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!signinData.name) {
      setError("Name is required!");
      return;
    } else if (!signinData.phone) {
      setError("Phone is required!");
      return;
    } else if (!signinData.email) {
      setError("Email is required!");
      return;
    } else if (!signinData.role) {
      setError("Role is required!");
      return;
    } else if (!signinData.district) {
      setError("District is required!");
      return;
    } else if (!signinData.province) {
      setError("Province is required!");
      return;
    } else if (!signinData.sector) {
      setError("Sector is required!");
      return;
    } else if (!signinData.cell) {
      setError("Cell is required!");
      return;
    } else if (!signinData.password) {
      setError("Password is required!");
      return;
    } else  {
      setError("");
      axios.post(`http://localhost:5000/api/user/signup`, signinData)
      .then(response=> {
        if (response.data === "Account with this email already exits.") {
          setError("Account with this email already exits.");
          return;
        } else if (response.data.status === 500) {
          setError("Failed to save!");
          return;
        } else {
          setSuccessMessage(response.data.message);
          console.log(response.data.message);
          navigate('/auth/signin', { replace: true });
        }
      })
      .catch(error=>setError(error))
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Sign up to Child Rights System
      </Typography>
      <Typography variant="body2" sx={{ mb: 5 }}>
        Already have an account? {''}
        <Link to={'/auth/signin/'}>Login</Link>
      </Typography> 
      <Typography>
        {error &&
          <Alert severity="error">{error}</Alert>
        }
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField name="name" value={signinData.name} onChange={updateData} label="Name" />
          <TextField name="phone" value={signinData.phone} onChange={updateData} label="Phone" />
          <TextField name="email" value={signinData.email} onChange={updateData} label="Email address" />
          {/* Role */}
          {/* <NativeSelect 
            name='role'
            onChange={updateData}
            sx={{padding:2}}
            >
              <option value=''>Select Role</option>
              <option value='Admin'>Admin</option>
              <option value='Supervisor'>Supervisor</option>
              <option value='Agent'>Agent</option>
          </NativeSelect> */}
          {/* Province */}
          <NativeSelect 
            name='province'
            // value={signinData.province}
            onChange={updateData}
            sx={{padding:2}}
          >
              <option value={''}>Select Province</option>
              <option value={'Kigali City'}>Kigali City</option>
              <option value={'Northern Province'}>Northern Province</option>
              <option value={'Southern Province'}>South Province</option>
              <option value={'Eastern Province'}>Eastern Province</option>
              <option value={'Western Province'}>Western Province</option>
          </NativeSelect>
          
          {/* Districts */}
          <NativeSelect 
            name='district'
            onChange={updateData}
            sx={{padding:2}}
            >
              <option value={''}>Select District</option>
              {
                signinData.province === 'Kigali City' ? 
                districts['Kigali City'].districts.map((district, index) => (
                  <option key={index} value={district}>{district}</option>
                ))
                :
                signinData.province === 'Northern Province' ? 
                districts['Northern Province'].districts.map((district, index) => (
                  <option key={index} value={district}>{district}</option>
                ))
                :
                signinData.province === 'Western Province' ? 
                districts['Western Province'].districts.map((district, index) => (
                  <option key={index} value={district}>{district}</option>
                ))
                :
                signinData.province === 'Eastern Province' ? 
                districts['Eastern Province'].districts.map((district, index) => (
                  <option key={index} value={district}>{district}</option>
                ))
                :
                signinData.province === 'Southern Province' ? 
                districts['Southern Province'].districts.map((district, index) => (
                  <option key={index} value={district}>{district}</option>
                ))
                :
                ''
              }
          </NativeSelect>

          {/* Sector */}
          <NativeSelect 
            name='sector'
            onChange={updateData}
            sx={{padding:2}}
            >
              <option value={''}>Select Sector</option>
              {
                signinData.district === 'Gasabo' ? 
                sectors['Gasabo'].sectors.map((sector, index) => (
                  <option key={index} value={sector}>{sector}</option>
                ))
                :
                signinData.district === 'Nyarugenge' ? 
                sectors['Nyarugenge'].sectors.map((sector, index) => (
                  <option key={index} value={sector}>{sector}</option>
                ))
                :
                signinData.district === 'Kicukiro' ? 
                sectors['Kicukiro'].sectors.map((sector, index) => (
                  <option key={index} value={sector}>{sector}</option>
                ))
                :
                ''
              }
          </NativeSelect>

          {/* Cell */}
          <NativeSelect 
            name='cell'
            onChange={updateData}
            sx={{padding:2}}
            >
              <option value={''}>Select Cell</option>
              {
                signinData.sector === 'Kacyiru' ? 
                cells['Kacyiru'].cells.map((cell, index) => (
                  <option key={index} value={cell}>{cell}</option>
                ))
                :
                signinData.sector === 'Jali' ? 
                cells['Jali'].cells.map((cell, index) => (
                  <option key={index} value={cell}>{cell}</option>
                ))
                :
                signinData.sector === 'Gisozi' ? 
                cells['Gisozi'].cells.map((cell, index) => (
                  <option key={index} value={cell}>{cell}</option>
                ))
                :
                ''
              }
          </NativeSelect>

          <TextField
            name="password"
            value={signinData.password}
            onChange={updateData}
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" sx={{marginTop: 5}}>
          Sign up
        </LoadingButton>
      </form>
    </>
  );
}
