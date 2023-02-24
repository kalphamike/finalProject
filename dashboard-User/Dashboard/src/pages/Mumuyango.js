import React, { useState , useEffect} from 'react';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Container, Stack,Typography,Button } from '@mui/material';

export default function Mumuyango() {

  const [cases, setCases] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000/api/report/list')
    .then(response=> {
      const filteredCases = [];
      response.data.forEach(element => {
        element.id=element._id
        if (element.familyResidence === localStorage.getItem('userLocation')) {
          filteredCases.push(element);
        }
      });
      setCases(filteredCases);
    })
    .catch(error => {
      console.log(error);
    })
  },[]);
  
  const columns = [
    {
      field: 'firstHeadOfFamilyName',
      headerName:" Umukuru W'umuryango ",
      width: 200,
      editable: true,
    },
    {
      field: 'headOfFamilyPhone',
      headerName: 'Nimero ya Telefoni',
      width: 175,
      editable: true,
    },
    {
      field: 'familyProblem',
      headerName: ' Ikabazo ',
      width: 200,
      editable: true,
    },
    {
      field: 'ProblemSolved',
      headerName: 'Cyaracyemutse ',
      width: 120,
      editable: true,
    },
    { field: 'effectOnChild', 
    headerName: 'Ingaruka kubana  ', 
    width: 175 
  },
  {
    field: 'actions',
    headerName: '',
    width: 80,
    renderCell: (params) => (
      <Button    
         variant="contained"
         color="primary"
         size="small"
         onClick={() => handleView(params.row.id)}
      >
        View
      </Button>
    ),
  },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];

  const rows = cases
    return (
    <>
    <Helmet><title> Mumuryango </title></Helmet>
     <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
         <Typography variant="h4" gutterBottom>
            lisite y' imiryango
          </Typography>
          {/* <Button  variant="contained"  href="localhost:3001/dashboard/NewCase">
          New Case
          </Button> */}
          
          </Stack>
        </Container> 
          <Box sx={{ height: 800, width: '100%' }}>
          
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
         
  </>  
    );
}

  

