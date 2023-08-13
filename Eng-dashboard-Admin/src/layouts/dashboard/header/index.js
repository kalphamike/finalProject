import React, { useEffect, useState } from 'react';
import PropTypes, { element } from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton,Button, Modal, Typography, FormControl, InputLabel } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
import AccountPopover from './AccountPopover';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { range } from 'lodash';
import { el } from 'date-fns/locale';
import API from 'src/utils/API';
import ReportTwo from 'src/components/mycomp/ReportTwo';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;
const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function Header({ onOpenNav }) {
  // POPUP CODES
  const [openPopUp, setOpenPopUp] = React.useState(false);
  const handleOpen = () => setOpenPopUp(true);
  const handleClose = () => setOpenPopUp(false);
  const [reports, setReports] = useState([]);
  const [cases, setCases] = useState([]);
  const [newReport, setNewReport] = useState({ 
    type: "", 
    data: {
      totalCases: 0,
      children: 0,
      riskChildren: 0,
      disabledChildren: 0,
      male: 0,
      female: 0,
    }});
  const [reportData, setReportData] =useState({
    totalCases: 0,
    children: 0,
    riskChildren: 0,
    disabledChildren: 0,
    male: 0,
    female: 0,
    visitedFamilies: 0,
    inRisk: 0,
    solved: 0,
    rest: 0
  }); 
  const [range, setRange] = useState({ from: '', to: '' });

  
  // Report Data
  useEffect(() => {
    axios.get(`http://${API.host}:${API.port}/api/case/list`)
    .then(response => {
      setCases(response.data)
    })
    .catch(error => console.log(error));
  }, [])

  // Report Data
  useEffect(() => {
    axios.get(`http://${API.host}:${API.port}/api/report/list`)
    .then(response => {
      setReports(response.data)
    })
    .catch(error => console.log(error));
  }, [])


  const generateReportData = () => {
    const fromDate = new Date(range.from).getTime();
    const toDate = new Date(range.to).getTime(); 
    
    var casesInRange = [];
    cases.forEach(element => {
      let reportDate = new Date(element.ReportDate).getTime();
      let caseLoc = element.locationOfCrime.split(", ");
      let superLoc = localStorage.getItem('adminLocation').split(", ");
      if (reportDate >= fromDate && reportDate <= toDate &&  (caseLoc[0] === superLoc[0] && caseLoc[1] === superLoc[1] && caseLoc[2] === superLoc[2])) {
        casesInRange.push(element);
      }  
    });

    var reportsInRange = [];
    reports.forEach(element => {
      let reportDate = new Date(element.dateOfReport).getTime();
      let caseLoc = element.agentLocation.split(", ");
      let superLoc = localStorage.getItem('adminLocation').split(", ");
      if (reportDate >= fromDate && reportDate <= toDate && (caseLoc[0] === superLoc[0] && caseLoc[1] === superLoc[1] && caseLoc[2] === superLoc[2])) {
        reportsInRange.push(element);
      }
    })

    var riskChildren=0; 
    var disabledChildren=0; 
    var male=0; 
    var female=0;  
    var inRisk=0;
    var solved=0; 
    var rest = 0;
     
    casesInRange.forEach(element => {
      if (element.victimeGender === 'Gabo') {
        male += 1;
      } else {
        female += 1;
      } 
      if (element.category === 'Abana bugarijwe') {
        riskChildren += 1;
      }
      if (element.hasDisability === 'Yego') {
        disabledChildren += 1;
      }
    });

    reportsInRange.forEach(element => {
      if (element.ProblemSolved === 'Yego') {
        solved += 1;
      } else {
        inRisk += 1;
      }
      if (element.familyProblem==='' && element.ProblemSolved==='' && element.effectDescription==='') {
        rest += 1;
      }
    })

    setReportData({
      children: casesInRange.length,
      riskChildren: riskChildren,
      disabledChildren: disabledChildren,
      male: male,
      female: female,
      visitedFamilies: reportsInRange.length,
      inRisk: inRisk,
      solved: solved,
      rest: rest
    });

    handleOpen();
  }

  // FOR GENERATING REPORTS ACCORDING TO CATEGORY
  const generateReport = ({ currentTarget: input }) => {
      setNewReport({...newReport, type: input.value});

      var riskChildren=0; 
      var disabledChildren=0; 
      var male=0; 
      var female=0; 
      
      let myCases = [];

      cases.forEach(element => {
        if (element.category === input.value) {
          myCases.push(element);
        }
      });

      myCases.forEach(element => {
        if (element.victimeGender === 'Gabo') {
          male += 1;
        } else {
          female += 1;
        } 
        if (element.category === 'Abana bugarijwe') {
          riskChildren += 1;
        }
        if (element.hasDisability === 'Yego') {
          disabledChildren += 1;
        }
      });
  
      setReportData({
        children: myCases.length,
        riskChildren: riskChildren,
        disabledChildren: disabledChildren,
        male: male,
        female: female,
        caseCategory: input.value,
      });
  
      handleOpen();
  }

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton onClick={onOpenNav} sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' },}}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
        {/* <Searchbar /> */}
        <div style={{ color: 'black', display: 'flex', flexDirection: 'row', width: '300px'}}>
          <select name="reportType" id="reportType" onChange={generateReport}>
            <option value="">Choose Category</option>
            <option value="Physical violence">Physical violence</option>
            <option value="Gender-based violence">Gender-based violence</option>
            <option value="Persecution">Persecution</option>
            <option value="School drop-out">School drop-out</option>
            <option value="Children in risk">Children in risk</option>
            <option value="In family">In family</option>
          </select>
        </div>
        <Box sx={{ flexGrow: 1 }} />
        
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1 }}>
          <ReportFilter handleOpen={handleOpen} reportData={reportData} openPopUp={openPopUp} handleClose={handleClose}/>
          <AccountPopover />
        </Stack>
      </StyledToolbar>

      {/* Pop up */}
      <Modal open={openPopUp} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" style={{ overflowY: 'scroll', height: '100%' }}>
        <ReportTwo reportData={reportData}/>
      </Modal>

      {/* Pop up */}
      {/* <Modal open={openPopUp} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" style={{ overflowY: 'scroll', height: '100%' }}>
        <ReportOne reportData={reportData}/>
      </Modal> */}
    </StyledRoot>
  );
}


// REPORT FILTER ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const ReportFilter = (props) => {
  const { handleOpen, reportData, openPopUp, handleClose } = props;

  const handleRange = ({currentTarget: input })=>{ setRange({...range, [input.name]: input.value}); };
  const handleLocation = ({currentTarget: input })=>{ setLocation({...location, [input.name]: input.value}); };
  
  const [location, setLocation] = useState({ province: '', district: '', sector: '' });
  const [range, setRange] = useState({ from: '', to: '' });
  
  const generateReportData = () => {
    handleOpen();
  }

  return (
    <>
      <select id="province" name={'age'} onChange={handleLocation}>
        <option value="">Select province</option>
        <option value={'Kigali City'}>Kigali City</option>
        <option value={'Northern'}>Northern</option>
        <option value={'Southern'}>Southern</option>
        <option value={'Eastern'}>Eastern</option>
        <option value={'Western'}>Western</option>
      </select>
      <select id="district" name={'district'} onChange={handleLocation}>
        <option value="">Select district</option>
        <option value={'Gasabo'}>Gasabo</option>
        <option value={'Kicukiro'}>Kicukiro</option>
      </select>
      <select id="sector" name={'sector'} onChange={handleLocation}>
        <option value="">Select sector</option>
        <option value={'Kacyiru'}>Kacyiru</option>
        <option value={'Jali'}>Jali</option>
        <option value={'Jabana'}>Jabana</option>
      </select>
      <TextField id="time" type="date" name='from' size='small' value={range.from} onChange={handleRange}/>
      <TextField id="time" type="date" name='to' size='small' value={range.to} onChange={handleRange}/>
      <Button onClick={generateReportData} variant="contained" spacing={2} >View Report</Button>

      {/* Report pop up */}
      <Modal open={openPopUp} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" style={{ overflowY: 'scroll', height: '100%' }}>
        <ReportTwo reportData={reportData}/>
      </Modal>
    </>
  );
}