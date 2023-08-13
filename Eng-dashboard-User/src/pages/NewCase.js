import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';
import { Alert, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, NativeSelect, Select, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/material/Collapse';
import ExpandMore from '@mui/material/Collapse';
import {fetchProvinces, fetchDistricts, fetchSectors} from '../locationAPI/locationHandler';
import MuMuryango from 'src/components/mycomp/MuMuryango';


export default function NewCase() {
  const navigate = useNavigate();

  // States
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [crimeLocations, setCrimeLocations] = useState( localStorage.getItem('userLocation') );
  
  const [locations, setLocations] = useState({ province: 'Kigali', district: 'Gasabo', sector: '', village: '' });
  const [suspectResidenceLocations, setSuspectResidenceLocations] = useState({ province: 'Kigali', district: 'Gasabo', sector: '', village:''});
  
  const [demoDistricts, setDemoDistricts] = useState([]);
  const [demoSectors, setDemoSectors] = useState([]);
  
  const [demoSuspectResDistricts, setSuspectResDemoDistricts] = useState([]);
  const [demoSuspectResSectors, setSuspectResDemoSectors] = useState([]);

  const [data, setData] = useState({ nameOfVictime: "", ageOfVictime: "",victimeResidence: "", victimeGender: "", hasDisability: "", disabilityDescription: "", educationLevel: "",suspectGender: "",
    category: "", firstguiderOfVictime: "", firstguiderResidence: "", firstguiderPhoneNumber: "", secondGuiderOfVictime: "", secondGuiderResidence: "", secondGuiderPhoneNumber: "", DateOfCrime: "", 
    suspectName: "", suspectAge:"", suspectPhoneNumber: "", supectResidence: "", firstWitness: "", FWPhoneNumber: "", secondWitness: "", SWPhoneNumber: "", locationOfCrime: "",
    discription: "", NameOfAgent: localStorage.getItem('userName'), agentPhoneNumber: localStorage.getItem('userPhone'), agentLocation: localStorage.getItem('userLocation'), caseStatus: "Pending", ReportDate:""
  });
  
  const [familyInfo, setFamilyInfo] = useState({
    firstHeadOfFamilyName: "",
    headOfFamilyPhone: "",
    secondHeadOfFamilyName: "",
    SecondOfFamilyPhone: "",
    numberOfFamilyMember: "",
    familyResidence: localStorage.getItem('userLocation'),
    familyProblem:"",
    DescriptionOfProblem:"",
    ProblemSolved: "",
    effectOnChild:"",
    effectDescription: "",
    NameOfAgent: localStorage.getItem('userName'),
    agentPhoneNumber: localStorage.getItem('userPhone'),
    agentLocation: localStorage.getItem('userLocation'),
    dateOfReport: new Date().toISOString().slice(0,10)
  });

  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(true);
  const [open3, setOpen3] = useState(true);
  const [open4, setOpen4] = useState(true);
  const [open5, setOpen5] = useState(true);
  
  // Function
  const handleClick1 = () => { setOpen1(!open1);};
  const handleClick2 = () => { setOpen2(!open2);};
  const handleClick3 = () => { setOpen3(!open3);};
  const handleClick4 = () => { setOpen4(!open4);};
  const handleClick5 = () => { setOpen5(!open5);};

  const handleLocation = ({currentTarget: input })=>{ setLocations({...locations, [input.name]: input.value}); };
  const handleSuspectResidenceLocation = ({currentTarget: input })=>{ setSuspectResidenceLocations({...suspectResidenceLocations, [input.name]: input.value});};
  const handleCrimeLocation = ({currentTarget: input })=>{ setCrimeLocations({...crimeLocations, [input.name]: input.value}); };
  
  //date converter
  const dateOnly = new Date().toISOString().slice(0,10);

  const resetInputs = () => {
    setData({
      nameOfVictime: "", ageOfVictime: "", victimeResidence: "", victimeGender: "", suspectGender: "", category: "", firstguiderOfVictime: "", firstguiderResidence: "",
      firstguiderPhoneNumber: "", secondGuiderOfVictime: "", secondGuiderResidence: "", secondGuiderPhoneNumber: "", DateOfCrime: "", suspectName: "", suspectPhoneNumber: "",
      supectResidence: "", firstWitness: "", FWPhoneNumber: "", secondWitness: "", SWPhoneNumber: "", locationOfCrime: "", discription: "", NameOfAgent: localStorage.getItem('userName'), agentPhoneNumber: localStorage.getItem('userPhone'),
      agentLocation: localStorage.getItem('agentLocation'), caseStatus: "Pending", ReportDate:"",village
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    data.victimeResidence = locations.province+", "+locations.district+", "+locations.sector+", "+data.village;
    data.locationOfCrime = crimeLocations;
    data.supectResidence = suspectResidenceLocations.province+", "+suspectResidenceLocations.district+", "+suspectResidenceLocations.sector+", "+data.village;
    const dateOnly = new Date().toISOString().slice(0,10);
    data.ReportDate=dateOnly;
    if(data.category === 'Kuva mwishuri' || data.category === 'Abana bugarijwe'){ data.supectResidence='' }

    console.log(familyInfo);
    
    if (familyInfo.firstHeadOfFamilyName || familyInfo.secondHeadOfFamilyName) {
      var LINK = 'http://localhost:5000/api/report/save';
      setError('');
      axios.post(LINK, familyInfo)
      .then(response => {
        setSuccessMessage(response.data.message);
        setTimeout(()=>{ window.location.reload() },3000)})
      .catch(error=> { if (error.response && error.response.status >= 400 && error.response.status <= 500) { setError(error) } });
    } else {
      var LINK = 'http://localhost:5000/api/case/save';
      setError('');
      axios.post(LINK, data)
      .then(response => {
        setSuccessMessage(response.data.message);
        setTimeout(()=>{ window.location.reload() },3000)
      })
      .catch(error=> { if (error.response && error.response.status >= 400 && error.response.status <= 500) { setError(error) } });
    }
  };

  if(successMessage) { setTimeout(() => { setSuccessMessage('') }, 5000) }
  const updateData = ({currentTarget: input}) => { setData({...data, [input.name]: input.value}) }
  
  return (
    <>
      <Helmet><title> Ikibazo Gishya </title></Helmet>
      <Box sx={{ padding: '40px'}}>
        <Typography variant="h4" gutterBottom>Ikibazo Gishya</Typography>
        {successMessage && <Alert severity="success" sx={{ marginBottom: '20px', width:'900px' }}>{successMessage}</Alert>}
        <form onSubmit={handleSubmit}>
          <List sx={{ width: '100%' }} component="nav" aria-labelledby="nested-list-subheader">    
            <select
              style={{padding: '7px 10px', border: '1px solid #b3cccc', marginBottom: '40px', width: '100%', borderRadius: '5px', fontSize: '18px', background: 'transparent', color:'#637381'}}
              name="category" id="category" onChange={updateData}>
              <option value="">Hitamo icyiciro</option>
              <option value="Ihohoterwa ry'umubiri">Ihohoterwa ry'umubiri</option>
              <option value="Ihohotera rishinyiye kugitsina ">Ihohotera rishinyiye kugitsina</option>
              <option value="Gutotezwa">Gutotezwa</option>
              <option value="Kuva mwishuri">Kuva mwishuri</option>
              <option value="Abana bugarijwe">Abana bugarijwe</option>
              <option value="Mu muryango">Mu muryango</option>
            </select>
  
          {/* </FormControl>   */}
          {data.category === 'Mu muryango' || data.category === '' ? <></> : 
          <>
            <ListItemButton style={{ background: "#2065d1", color: "white", borderBottom: "1px solid white"}} onClick={handleClick1}>
              <ListItemText primary="Amakuru y'uwahohotewe" />
              {open1 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            
            <Collapse in={open1} timeout="auto" unmountOnExit>  
              <ListItemButton sx={{ pl: 4, gap: '20px' }}>
                <Stack spacing={3} width='45%'>
                  <TextField name="nameOfVictime" required size='small' value={data.nameOfVictime} onChange={updateData} label="Amazina" />
                  <TextField name="ageOfVictime" required size='small' value={data.ageOfVictime} onChange={updateData} label="Imyaka" />                                    
                  <select
                    style={{padding: '7px 10px', border: '1px solid #b3cccc', width: '100%', borderRadius: '5px', fontSize: '18px', background: 'transparent', color:'#637381'}}
                    name="victimeGender" 
                    id="victimeGender" 
                    onChange={updateData}>
                    <option value="">Hitamo Igistina</option>
                    <option value='Gabo'>Gabo</option>
                    <option value='Gore'>Gore</option>
                  </select>
                  <select
                    style={{padding: '7px 10px', border: '1px solid #b3cccc', width: '100%', borderRadius: '5px', fontSize: '18px', background: 'transparent', color:'#637381'}}
                    name="hasDisability" 
                    id="hasDisability" 
                    onChange={updateData}>
                      <option value="">Abana n'ubumuga</option>
                      <option value="Yego">Yego</option>
                      <option value="Oya">Oya</option>
                  </select>
                  {data.hasDisability === 'Oya' || data.hasDisability === '' ? <></> :
                  <TextField name="disabilityDescription"  size='small'  value={data.disabilityDescription} onChange={updateData} label="Ubumuga Afite" />
                  }
                </Stack>

                <Stack spacing={3} width='45%'>
                  {data.ageOfVictime < 4 ? <></>: 
                    <select
                      style={{padding: '7px 10px', border: '1px solid #b3cccc', width: '100%', borderRadius: '5px', fontSize: '18px', background: 'transparent', color:'#637381'}}
                      name="educationLevel" 
                      onChange={updateData}>
                        <option value="">Hitamo icyiciro cy'amashuri</option>
                      <option value='Nursery'>Amashuri y'ishucye</option>
                      <option value='Primary'>Amashuri abanza</option>
                      <option value='Secondary'>Amashuri y'ishumbuye</option>
                    </select>
                  }                      
                  <FormControl size="small" fullWidth>
                    <InputLabel id="choose-province">Intara</InputLabel>
                    <Select 
                      name="province" 
                      id="province" 
                      label="Province"
                      labelId="choose-province"
                      onClick={()=>setDemoDistricts(fetchDistricts(locations.province)[0])} 
                      onChange={handleLocation}>
                      <MenuItem value=''>Hitamo Intara</MenuItem>
                      {fetchProvinces().map((province, index)=>
                        <MenuItem value={province.name} key={index}>{province.name}</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                  <FormControl size="small" fullWidth>
                    <InputLabel id="choose-district">Akarere</InputLabel>
                    <Select 
                      name="district" 
                      id="district" 
                      label="district"
                      labelId="choose-district"
                      onClick={()=> setDemoDistricts(fetchDistricts(locations.province)[0])} 
                      onChange={handleLocation}>
                      <MenuItem value=''>Hitamo Akarera</MenuItem>
                      {demoDistricts.map((district, index) =>
                        <MenuItem value={district.name} key={index}>{district.name}</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                  <FormControl size="small" fullWidth>
                    <InputLabel id="choose-sector">Umurenge</InputLabel>
                    <Select
                      name="sector" 
                      id="sector" 
                      label='Sector'
                      labelId="choose-sector"
                      onClick={()=>setDemoSectors(fetchSectors(locations.province, locations.district)[0])} 
                      onChange={handleLocation}>
                      <MenuItem value=''>Hitamo Umurenge</MenuItem>
                      {demoSectors.map((sector, index) => 
                        <MenuItem value={sector.name} key={index}>{sector.name}</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                  <TextField name="village"  size='small' value={data.village} onChange={updateData} label="Akagali" />

                </Stack>
              </ListItemButton>
            </Collapse>
            
            {/* Ababye/Abamurera */}
            <ListItemButton style={{ background: "#2065d1", color: "white", borderBottom: "1px solid white"}} onClick={handleClick2}>
              <ListItemText primary="Ababye/Abamurera" />
              {open2 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={open2} timeout="auto" unmountOnExit>
              <ListItemButton sx={{ pl: 4, gap: '20px'  }}>
                <Stack spacing={3} width='45%'>
                  <TextField name="firstguiderOfVictime" required size='small' value={data.firstguiderOfVictime} onChange={updateData} label="Amazina yumurera wa mbere" />
                  <TextField name="firstguiderResidence" required size='small' value={data.firstguiderResidence} onChange={updateData} label="Isano" />
                  <TextField name="firstguiderPhoneNumber" required size='small' value={data.firstguiderPhoneNumber} onChange={updateData} label="Nimero ya telefone" />
                </Stack>
                <Stack spacing={3} width='45%'>
                  <TextField name="secondGuiderOfVictime"  size='small' value={data.secondGuiderOfVictime} onChange={updateData} label="Amazina yumurera wa kabiri" />
                  <TextField name="secondGuiderResidence"  size='small' value={data.secondGuiderResidence} onChange={updateData} label="Isano" />
                  <TextField name="secondGuiderPhoneNumber"  size='small' value={data.secondGuiderPhoneNumber} onChange={updateData} label="Nimero ya telefone" />
                </Stack>
              </ListItemButton>
            </Collapse>
          </>
          }

          {data.category === 'Kuva mwishuri' || data.category === 'Abana bugarijwe' || data.category === 'Mu muryango' ||  data.category === ''  ?
          <></> 
          : 
          <>
            {/* AMAKURU Y'UREGWA */}
            <ListItemButton style={{ background: "#2065d1", color: "white", borderBottom: "1px solid white"}} onClick={handleClick4}>
              <ListItemText primary="Amakuri y'uregwa" />
              {open4 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={open4} timeout="auto" unmountOnExit>
              <ListItemButton sx={{ pl: 4, display:'flex', gap: '20px'  }}>
                <Stack spacing={3} width='45%'>
                  <TextField name="suspectName" size='small' value={data.suspectName} onChange={updateData} label="Amazina " />
                  <TextField name="suspectAge" size='small' value={data.suspectAge} onChange={updateData} label="Imyaka  " />
                  <FormControl size="small" fullWidth>
                    <select
                      style={{padding: '7px 10px', border: '1px solid #b3cccc', width: '100%', borderRadius: '5px', fontSize: '18px', background: 'transparent', color:'#637381'}}
                      onChange={updateData}
                      name="suspectGender">
                      <option value=''>Hitamo Igitsina</option>
                      <option value='Gabo'>Gabo</option>
                      <option value='Gore'>Gore</option>
                    </select>
                  </FormControl>
                  <TextField name="suspectPhoneNumber" size='small' value={data.suspectPhoneNumber} onChange={updateData} label="Nimero ya telefoni" />
                </Stack>
                <Stack spacing={3} width='45%'>
                  <select   style={{padding: '7px 10px', border: '1px solid #b3cccc', width: '100%', borderRadius: '5px', fontSize: '18px', background: 'transparent', color:'#637381'}}
                  name="province" id="province" onClick={()=>setDemoDistricts(fetchDistricts(locations.province)[0])} onChange={handleSuspectResidenceLocation}>
                    <option value=''>Hitamo Intara</option>
                    {fetchProvinces().map((suspectProvince, index)=>
                      <option value={suspectProvince.name} key={index}>{suspectProvince.name}</option>
                    )}
                  </select>
                  <select   style={{padding: '7px 10px', border: '1px solid #b3cccc', width: '100%', borderRadius: '5px', fontSize: '18px', background: 'transparent', color:'#637381'}} 
                  name="district" id="district" onClick={()=> setDemoDistricts(fetchDistricts(locations.province)[0])} onChange={handleSuspectResidenceLocation}>
                    <option value=''>Hitamo Akarere</option>
                    {demoDistricts.map((suspectDistrict, index) =>
                      <option key={index}>{suspectDistrict.name}</option>
                    )}
                  </select>
                  <select  style={{padding: '7px 10px', border: '0.5px solid #b3cccc', width: '100%', borderRadius: '5px', fontSize: '18px', background: 'transparent', color:'#637381'}}
                  name="sector" id="sector" onClick={()=>setDemoSectors(fetchSectors(locations.province, locations.district)[0])} onChange={handleSuspectResidenceLocation}>
                    <option value=''>Hitamo Umurenge</option>
                    {demoSectors.map((suspectSector, index) => 
                      <option value={suspectSector.name} key={index}>{suspectSector.name}</option>
                    )}
                  </select>
                </Stack>
              </ListItemButton>
            </Collapse>

            <ListItemButton style={{ background: "#2065d1", color: "white", borderBottom: "1px solid white"}} onClick={handleClick3}>
              <ListItemText primary="Abatangabuhamya" />
              {open3 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={open3} timeout="auto" unmountOnExit>
              <ListItemButton sx={{ pl: 4, gap: '20px'  }}>
                <Stack spacing={3} width='45%'>
                  <TextField name="firstWitness" size='small' value={data.firstWitness} onChange={updateData} label="Umutangabuhamya wa mbere" />
                  <TextField name="FWPhoneNumber" size='small' value={data.FWPhoneNumber} onChange={updateData} label="Telefone y'umutangabuhamya" />
                </Stack>
                <Stack spacing={3} width='45%'>
                  <TextField name="secondWitness" size='small' value={data.secondWitness} onChange={updateData} label="Umutangabuhamya wa kabiri" />
                  <TextField name="SWPhoneNumber" size='small' value={data.SWPhoneNumber} onChange={updateData} label="Telefone y'umutangabuhamya" />
                </Stack>
              </ListItemButton>
            </Collapse>
            
          </>}

          {/* CASE DETAILS */}
          
          {data.category === 'Mu muryango' ||  data.category === '' ? <></> : 
            <>
              <ListItemButton style={{ background: "#2065d1", color: "white", borderBottom: "1px solid white"}} onClick={handleClick5}>
                <ListItemText primary="Andi makuru " />
                {open5 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <Collapse in={open5} timeout="auto" unmountOnExit>
                <ListItemButton sx={{ pl: 4, gap: '20px'  }}>
                  <Stack spacing={3} width='45%'>
                    <TextField name="DateOfCrime" size='small' required type="date" label="Itariki byabereyeho " value={data.DateOfCrime} onChange={updateData}/>
                  </Stack>
                  <Stack spacing={3} width='45%'>
                    <TextField name="discription" size='small' value={data.discription} onChange={updateData} label="Andi makuru kukibazo" />
                  </Stack>
                </ListItemButton>
              </Collapse>
            </>
          }

          {data.category === 'Mu muryango'  ? 
            <MuMuryango familyInfo={familyInfo} setFamilyInfo={setFamilyInfo} /> : 
            <></>
          }

          </List>  
            {data.category === '' ? <></> : 
              <LoadingButton fullWidth size="large" style={{ background: '#1d518a'}} type="submit" variant="contained" sx={{marginTop: 5}}>Ohereza Ikibazo</LoadingButton>
            }         
          {error && <Alert severity="error" sx={{ marginTop: '20px', width:'900px' }}>{error}</Alert>}
        </form>
      </Box>
    </>
  );
}