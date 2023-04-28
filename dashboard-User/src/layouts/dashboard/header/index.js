import React, { useEffect, useState } from 'react';
import PropTypes, { element } from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton,Button, Modal, Typography } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import ReportOne from 'src/components/mycomp/ReportOne';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { range } from 'lodash';
import { el } from 'date-fns/locale';

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
    axios.get('http://localhost:5000/api/case/list')
    .then(response => {
      setCases(response.data)
    })
    .catch(error => console.log(error));
  }, [])

  // Report Data
  useEffect(() => {
    axios.get('http://localhost:5000/api/report/list')
    .then(response => {
      setReports(response.data)
    })
    .catch(error => console.log(error));
  }, [])

  const handleRange = ({currentTarget: input })=>{ setRange({...range, [input.name]: input.value}); };

  const generateReportData = () => {
    const fromDate = new Date(range.from).getTime();
    const toDate = new Date(range.to).getTime(); 
    
    var casesInRange = [];
    cases.forEach(element => {
      let reportDate = new Date(element.ReportDate).getTime();
      if (reportDate >= fromDate && reportDate <= toDate && element.locationOfCrime === localStorage.getItem('userLocation')) {
        casesInRange.push(element);
      }  
    });

    var reportsInRange = [];
    reports.forEach(element => {
      let reportDate = new Date(element.dateOfReport).getTime();
      if (reportDate >= fromDate && reportDate <= toDate && element.agentLocation === localStorage.getItem('userLocation')) {
        reportsInRange.push(element);
      }
    })

    console.log(reportsInRange);

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

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton onClick={onOpenNav} sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' },}}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
        {/* <Searchbar /> */}
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1, }}>
          <TextField id="time" type="date" name='from' size='small' value={range.from} onChange={handleRange}/>
          <TextField id="time" type="date" name='to' size='small' value={range.to} onChange={handleRange}/>
          <Button onClick={generateReportData} variant="contained"  spacing={2} >Raporo</Button>
          <AccountPopover />
        </Stack>
      </StyledToolbar>
      
      {/* Pop up */}
      <Modal open={openPopUp} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" style={{ overflowY: 'scroll', height: '100%' }}>
        <ReportOne reportData={reportData}/>
      </Modal>
    </StyledRoot>
  );
}
