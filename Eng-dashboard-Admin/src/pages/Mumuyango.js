import React, { useState , useEffect} from 'react';

import { GrView } from 'react-icons/gr';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Container, Stack,Typography,Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import { LeftSide, RightSide, SectionCategory, TextArea, TwoSidedContainer } from 'src/components/mycomp/CaseDetailsComponents';
import Message from 'src/components/mycomp/Message';
import { useNavigate } from 'react-router-dom';
import API from 'src/utils/API';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 8,
  overflowY: 'scroll',
};

export default function Mumuyango() {

  const [cases, setCases] = useState([]);
  const [open, setOpen] = useState(false);
  const [caseDetails, setCaseDetails] = useState({});
  const [caseId, setCaseId] = useState('');
  const [progress, setProgress] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState({ text:'', color:''});
  const [comment, setComment] = useState('');
  const [reportId, setReportId] = useState('');
  const [reportDetails, setReportDetails] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(()=>{
    axios.get(`http://${API.host}:${API.port}/api/report/list`)
    .then(response=> {
      const filteredCases = [];
      response.data.forEach(element => {
        element.id=element._id
        var caseLoc = element.familyResidence.split(", ");
        var superLoc = localStorage.getItem('adminLocation').split(", ");

        if (caseLoc[0] === superLoc[0] && caseLoc[1] === superLoc[1] && caseLoc[2] === superLoc[2]) {
          filteredCases.push(element);
        }
      });
      setCases(filteredCases);
    })
    .catch(error => {
      console.log(error);
    })
  },[]);



  const showCaseData = async (id) => {
    console.log("Case id: "+id);
    

    await axios.get(`http://${API.host}:${API.port}/api/report/findByID?id=${id}`)
    .then(response =>{
      setReportDetails(response.data);
      handleOpen()
    })
    .catch(error => console.log(error))
  }
   
  const handleComment = ({ currentTarget: input }) => {
    setComment(input.value);
  };
  
  const submitComment = (e) => {
    e.preventDefault();
    
    if (comment === '') {
      setMessage({text:'Nta makuru mashya watanze. Funga dosiye.', color: 'error'})
      setOpenSnackbar(true);
    } else {
      setProgress('Kohereza ...');
      setTimeout(()=>{
        caseDetails.comment = comment;
        axios.put(`http://${API.host}:${API.port}/api/report/update?id=${caseDetails._id}`, caseDetails)
        .then(response => {
            if (response.status === 201) {
              setMessage({text: 'Impinuka zakozwe ' ,color: 'success'})
              setOpenSnackbar(true);
              setProgress('');
            }
        })
        .catch(error=> { if (error.response && error.response.status >= 400 && error.response.status <= 500) { setError(error) } });
      },3000)
    }
  }

  
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
    width: 50,
    renderCell: (params) => ( 
      <TableAction params={params} handleOpen={handleOpen} caseId={caseId} setCaseId={setCaseId} showCaseData={showCaseData}/>
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

          <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
        <SectionCategory>Amakuru k'umuryango</SectionCategory>
          <TwoSidedContainer>
          <LeftSide>
              <TwoSidedContainer>
                <LeftSide>
                  <strong>Umukuru w'umuryango:</strong>
                </LeftSide>
                <RightSide>
                  <p>{reportDetails.firstHeadOfFamilyName}</p>
                </RightSide>
              </TwoSidedContainer>
              <TwoSidedContainer>
                <LeftSide>
                  <strong>telifone:</strong>
                </LeftSide>
                <RightSide>
                  <p>{reportDetails.headOfFamilyPhone}</p>
                </RightSide>
              </TwoSidedContainer>
              <TwoSidedContainer>
                <LeftSide>
                  <strong>Aho umuryango utuye:</strong>
                </LeftSide>
                <RightSide>
                  <p>{reportDetails.familyResidence}</p>
                </RightSide>
              </TwoSidedContainer>
            </LeftSide>
          
            <RightSide>
                <TwoSidedContainer>
                  <LeftSide>
                    <strong>Umukuru w'umuryango(2):</strong>
                  </LeftSide>
                  <RightSide>
                    <p>{reportDetails.secondHeadOfFamilyName}</p>
                  </RightSide>
                </TwoSidedContainer>
                <TwoSidedContainer>
                  <LeftSide>
                    <strong>telifone(2):</strong>
                  </LeftSide>
                  <RightSide>
                    <p>{reportDetails.SecondOfFamilyPhone}</p>
                  </RightSide>
                </TwoSidedContainer>
                <TwoSidedContainer>
                <LeftSide>
                  <strong>Umubare w'umuryango:</strong>
                </LeftSide>
                <RightSide>
                  <p>{reportDetails.numberOfFamilyMember}</p>
                </RightSide>
              </TwoSidedContainer>
              </RightSide>
          </TwoSidedContainer>              
          <hr />

          <SectionCategory>Amakuru Ku kibazo</SectionCategory>
          <TwoSidedContainer>
          <LeftSide>
                <TwoSidedContainer>
                  <LeftSide>
                    <strong>Imiterere yikibazo:</strong>
                  </LeftSide>
                  <RightSide>
                    <p>{reportDetails.familyProblem}</p>
                  </RightSide>
                </TwoSidedContainer>
                <TwoSidedContainer>
                  <LeftSide>
                    <strong>Ubusobanuro bw'ikibazo</strong>
                  </LeftSide>
                  <RightSide>
                    <p>{reportDetails.DescriptionOfProblem}</p>
                  </RightSide>
                </TwoSidedContainer>
                <TwoSidedContainer>
                <LeftSide>
                  <strong>Cyaracyemutse:</strong>
                </LeftSide>
                <RightSide>
                  <p>{reportDetails.ProblemSolved}</p>
                </RightSide>
              </TwoSidedContainer>
              </LeftSide>
          </TwoSidedContainer>              
          <hr />
          <SectionCategory>Amakuru k'ubana</SectionCategory>
          <TwoSidedContainer>
          <LeftSide>
                <TwoSidedContainer>
                  <LeftSide>
                    <strong>Ingaruka kubana:</strong>
                  </LeftSide>
                  <RightSide>
                    <p>{reportDetails.effectOnChild}</p>
                  </RightSide>
                </TwoSidedContainer>
            </LeftSide>
            <RightSide>
                <TwoSidedContainer>
                  <LeftSide>
                    <strong>Imiterere yingaruka:</strong>
                  </LeftSide>
                  <RightSide>
                    <p>{reportDetails.effectDescription}</p>
                  </RightSide>
                </TwoSidedContainer>
            </RightSide>  
          </TwoSidedContainer>      
          <hr/>
          
          
          
      
          {/* <Button  variant="contained" 
            // onClick={()=> {
            //   localStorage.setItem('filter', caseDetails._id)
            //   navigate('/dashboard/Cases')  
            // }
            // }
            >
              Kosora </Button> */}
        </Box>
          </Modal>
      <Message message={message.text} colorType={message.color} setOpenSnackbar={setOpenSnackbar} openSnackbar={openSnackbar} />
         
  </>  
    );
}

  

const TableAction = ({params, handleOpen, caseId, setCaseId, showCaseData}) => {
  return (
    <>
      <button style={{ background: 'transparent', border: 'none', color:'#2065d1', cursor: 'pointer'}} onClick={()=>{ showCaseData(params.row.id) }}>
          <GrView/>
      </button>
    </>
  )
}
  

