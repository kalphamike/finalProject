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

export default function Victims() {
  
  
  const navigate=useNavigate();
  const [cases, setCases] = useState([]);
  const [open, setOpen] = useState(false);
  const [caseDetails, setCaseDetails] = useState({});
  const [caseId, setCaseId] = useState('');
  const [progress, setProgress] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState({ text:'', color:''});
  const [comment, setComment] = useState('');


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 
  useEffect(()=>{
    axios.get('http://localhost:5000/api/case/list')
    .then(response=> {
      const filteredCases = [];
      response.data.forEach(element => {
        element.id=element._id
       var caseLoc = element.locationOfCrime.split(", ");
        var superLoc = localStorage.getItem('supervisorLocation').split(", ");

        if ( caseLoc[0] === superLoc[0] && caseLoc[1] === superLoc[1] && caseLoc[2] === superLoc[2]){
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
    

    await axios.get(`http://localhost:5000/api/case/findByID?id=${id}`)
    .then(response =>{
      setCaseDetails(response.data);
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
        axios.put(`http://localhost:5000/api/case/update?id=${caseDetails._id}`, caseDetails)
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
      field: 'nameOfVictime',
      headerName: 'Amazina',
      width: 150,
      editable: true,
    },
    {
      field: 'ageOfVictime',
      headerName: 'Imyaka ',
      width: 75,
      editable: true,
    },
    {
      field: 'victimeGender',
      headerName: ' Igitsina',
      width: 100,
      editable: true,
    },
    {
      field: 'victimeResidence',
      headerName: 'Aha atuye',
      width: 150,
      editable: true,
    },
    { 
      field: 'firstguiderOfVictime', 
      headerName: 'Umurera ', 
      width: 150 
    },
    { 
      field: 'firstguiderPhoneNumber', 
      headerName: "Telefoni y'umurera", 
      width: 150 
    },
    {
      field: 'hasDisability',
      headerName: "Ubumuga",
      width: 120,
      editable: true,
    },
    {
      field: 'actions',
      headerName: '',
      width: 50,
      renderCell: (params) => ( 
        <TableAction params={params} handleOpen={handleOpen} caseId={caseId} setCaseId={setCaseId} showCaseData={showCaseData}/>
      ),
    },
  ];

  const rows = cases


    return (
      
      

    <>
    <Helmet><title> Abana  </title></Helmet>
     <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
         <Typography variant="h4" gutterBottom>
            Lisite y'abana 
          </Typography>
          <Button  variant="contained" onClick={()=> navigate('/dashboard/NewCase')}>Ikibazo Gishya</Button>          
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
          <SectionCategory>Amakuru ku mwana</SectionCategory>
          <TwoSidedContainer>
            <LeftSide>
              <TwoSidedContainer>
                <LeftSide>
                  <strong>Amazina y'umwana:</strong>
                </LeftSide>
                <RightSide>
                  <p>{caseDetails.nameOfVictime}</p>
                </RightSide>
              </TwoSidedContainer>
              <TwoSidedContainer>
                <LeftSide>
                  <strong>Imyaka:</strong>
                </LeftSide>
                <RightSide>
                  <p>{caseDetails.ageOfVictime}</p>
                </RightSide>
              </TwoSidedContainer>
              <TwoSidedContainer>
                <LeftSide>
                  <strong>Aho atuye:</strong>
                </LeftSide>
                <RightSide>
                  <p>{caseDetails.victimeResidence}</p>
                </RightSide>
              </TwoSidedContainer>
              <TwoSidedContainer>
                <LeftSide>
                  <strong>Igitsina:</strong>
                </LeftSide>
                <RightSide>
                  <p>{caseDetails.victimeGender}</p>
                </RightSide>
              </TwoSidedContainer>
            </LeftSide>
            <RightSide>
              <TwoSidedContainer>
                <LeftSide>
                  <strong>Abana n'ubumuga:</strong>
                </LeftSide>
                <RightSide>
                  <p>{caseDetails.hasDisability}</p>
                </RightSide>
              </TwoSidedContainer>
              {(caseDetails.hasDisability==='yego' || caseDetails.hasDisability==='Yego') && 
                <TwoSidedContainer>
                  <LeftSide>
                    <strong>Ubumuga afite:</strong>
                  </LeftSide>
                  <RightSide>
                    <p>{caseDetails.disabilityDescription}</p>
                  </RightSide>
                </TwoSidedContainer>
              }
              <TwoSidedContainer>
                <LeftSide>
                  <strong>Icyiciro cy'amashuri:</strong>
                </LeftSide>
                <RightSide>
                  <p>{caseDetails.educationLevel}</p>
                </RightSide>
              </TwoSidedContainer>
            </RightSide>
          </TwoSidedContainer>
          <hr />
          <SectionCategory>Amakuru ku barera umwana</SectionCategory>
          <TwoSidedContainer>
            <LeftSide>
              <TwoSidedContainer>
                <LeftSide>
                  <strong>Umurera:</strong>
                </LeftSide>
                <RightSide>
                  <p>{caseDetails.firstguiderOfVictime}</p>
                </RightSide>
              </TwoSidedContainer>
              <TwoSidedContainer>
                <LeftSide>
                  <strong>Aho umurera atuye:</strong>
                </LeftSide>
                <RightSide>
                  <p>{caseDetails.firstguiderResidence}</p>
                </RightSide>
              </TwoSidedContainer>
              <TwoSidedContainer>
                <LeftSide>
                  <strong>Telefoni y'umurera:</strong>
                </LeftSide>
                <RightSide>
                  <p>{caseDetails.firstguiderPhoneNumber}</p>
                </RightSide>
              </TwoSidedContainer>
            </LeftSide>
            <RightSide>
            <TwoSidedContainer>
                <LeftSide>
                  <strong>Umurera (2):</strong>
                </LeftSide>
                <RightSide>
                  <p>{caseDetails.secondGuiderOfVictime}</p>
                </RightSide>
              </TwoSidedContainer>
              <TwoSidedContainer>
                <LeftSide>
                  <strong>Aho umurera atuye (2):</strong>
                </LeftSide>
                <RightSide>
                  <p>{caseDetails.secondGuiderResidence}</p>
                </RightSide>
              </TwoSidedContainer>
              <TwoSidedContainer>
                <LeftSide>
                  <strong>Telefoni y'umurera (2):</strong>
                </LeftSide>
                <RightSide>
                  <p>{caseDetails.secondGuiderPhoneNumber}</p>
                </RightSide>
              </TwoSidedContainer>
            </RightSide>
          </TwoSidedContainer>
          <hr />
          
          
          
      
          <Button  variant="contained" 
            onClick={()=> {
              localStorage.setItem('filter', caseDetails._id)
              navigate('/dashboard/Cases')  
            }
            }>
              Amakuru y'ikirego</Button>
          
              
          
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
  

