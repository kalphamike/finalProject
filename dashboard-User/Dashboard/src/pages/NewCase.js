import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';
import { IconButton, InputAdornment, NativeSelect, TextField } from '@mui/material';
import Iconify from 'src/components/iconify';
import { Stack } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { districts, sectors, cells } from './../sections/auth/Locations';
import axios from 'axios';


export default function NewCase() {

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    nameOfVictime: "",
    ageOfVictime: "",
    victimeResidence: "",
    //Guiders Information
    //First guide Information
    firstguiderOfVictime: "",
    firstguiderResidence: "",
    firstguiderPhoneNumber: "",
    //Second Guiders Information
    secondGuiderOfVictime: "",
    secondGuiderResidence: "",
    secondGuiderPhoneNumber: "",
    //Crime Detail
    DateOfCrime:"",
    suspectName:"",
    suspectPhoneNumber:"",
    supectResidence:"",
    firstWitness:"",
    FWPhoneNumber:"",
    secondWitness:"",
    SWPhoneNumber: "",
    locationOfCrime:"",
    discription:"",
    //ather Case information
    NameOfAgent: localStorage.getItem('userName'),
    agentPhoneNumber: localStorage.getItem('userPhone'),
    agentLocation: localStorage.getItem('userLocation'),
    caseStatus:"Pending",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // setError("");
    axios.post(`http://localhost:5000/api/case/save`, data)
    .then(response=> {
      setSuccessMessage(response.data.message);
        console.log(response.data.message);
    })
    .catch(error=>setError(error));
  };

  const updateData = ({currentTarget: input}) => {
    setData({...data, [input.name]: input.value})
  }

  return (
    <>
      <Helmet>
        <title> New Case </title>
      </Helmet>

      <Box sx={{ maxWidth: 400 }}>
        <Typography variant="h4" gutterBottom>
              New Case
        </Typography>
        <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField name="nameOfVictime" value={data.nameOfVictime} onChange={updateData} label="Name of Victime" />
          <TextField name="ageOfVictime" value={data.ageOfVictime} onChange={updateData} label="Age of victime" />
          <TextField name="victimeResidence" value={data.victimeResidence} onChange={updateData} label="Victime residence" />
          
          <TextField name="firstguiderOfVictime" value={data.firstguiderOfVictime} onChange={updateData} label="Name of first guide" />
          <TextField name="firstguiderResidence" value={data.firstguiderResidence} onChange={updateData} label="Residence of first guide" />
          <TextField name="firstguiderPhoneNumber" value={data.firstguiderPhoneNumber} onChange={updateData} label="Phone number of first guide" />
          <TextField name="secondGuiderOfVictime" value={data.secondGuiderOfVictime} onChange={updateData} label="Name of second guide" />
          <TextField name="secondGuiderResidence" value={data.secondGuiderResidence} onChange={updateData} label="Residence of second guide" />
          <TextField name="secondGuiderPhoneNumber" value={data.secondGuiderPhoneNumber} onChange={updateData} label="Phone number of second guide" />

          <TextField name="DateOfCrime" type="date" value={data.DateOfCrime} onChange={updateData}/>
          <TextField name="suspectName" value={data.suspectName} onChange={updateData} label="Suspect name" />
          <TextField name="suspectPhoneNumber" value={data.suspectPhoneNumber} onChange={updateData} label="Suspect phone number" />
          <TextField name="supectResidence" value={data.supectResidence} onChange={updateData} label="Suspect residence" />
          <TextField name="firstWitness" value={data.firstWitness} onChange={updateData} label="first Witness" />
          <TextField name="FWPhoneNumber" value={data.FWPhoneNumber} onChange={updateData} label="FW Phone Number" />
          <TextField name="secondWitness" value={data.secondWitness} onChange={updateData} label="second Witness" />
          <TextField name="SWPhoneNumber" value={data.SWPhoneNumber} onChange={updateData} label="SW Phone Number" />
          <TextField name="locationOfCrime" value={data.locationOfCrime} onChange={updateData} label="location Of Crime" />
          <TextField name="discription" value={data.discription} onChange={updateData} label="discription" />

          {/* <NativeSelect 
            name='province'
            value={data.victimprovince}
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
          <NativeSelect 
            name='district'
            onChange={updateData}
            sx={{padding:2}}
            >
              <option value={''}>Select District</option>
              {
                data.province === 'Kigali City' ? 
                districts['Kigali City'].districts.map((district, index) => (
                  <option key={index} value={district}>{district}</option>
                ))
                :
                data.province === 'Northern Province' ? 
                districts['Northern Province'].districts.map((district, index) => (
                  <option key={index} value={district}>{district}</option>
                ))
                :
                data.province === 'Western Province' ? 
                districts['Western Province'].districts.map((district, index) => (
                  <option key={index} value={district}>{district}</option>
                ))
                :
                data.province === 'Eastern Province' ? 
                districts['Eastern Province'].districts.map((district, index) => (
                  <option key={index} value={district}>{district}</option>
                ))
                :
                data.province === 'Southern Province' ? 
                districts['Southern Province'].districts.map((district, index) => (
                  <option key={index} value={district}>{district}</option>
                ))
                :
                ''
              }
          </NativeSelect>
          <NativeSelect 
            name='sector'
            onChange={updateData}
            sx={{padding:2}}
            >
              <option value={''}>Select Sector</option>
              {
                data.district === 'Gasabo' ? 
                sectors['Gasabo'].sectors.map((sector, index) => (
                  <option key={index} value={sector}>{sector}</option>
                ))
                :
                data.district === 'Nyarugenge' ? 
                sectors['Nyarugenge'].sectors.map((sector, index) => (
                  <option key={index} value={sector}>{sector}</option>
                ))
                :
                data.district === 'Kicukiro' ? 
                sectors['Kicukiro'].sectors.map((sector, index) => (
                  <option key={index} value={sector}>{sector}</option>
                ))
                :
                ''
              }
          </NativeSelect>
          <NativeSelect 
            name='cell'
            onChange={updateData}
            sx={{padding:2}}
            >
              <option value={''}>Select Cell</option>
              {
                data.sector === 'Kacyiru' ? 
                cells['Kacyiru'].cells.map((cell, index) => (
                  <option key={index} value={cell}>{cell}</option>
                ))
                :
                data.sector === 'Jali' ? 
                cells['Jali'].cells.map((cell, index) => (
                  <option key={index} value={cell}>{cell}</option>
                ))
                :
                data.sector === 'Gisozi' ? 
                cells['Gisozi'].cells.map((cell, index) => (
                  <option key={index} value={cell}>{cell}</option>
                ))
                :
                ''
              }
          </NativeSelect> */}
        </Stack>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" sx={{marginTop: 5}}>
          Sign up
        </LoadingButton>
      </form>
      </Box>
    </>
  );
}