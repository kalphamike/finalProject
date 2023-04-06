
import React, { useState , useEffect} from 'react';


import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { GrView } from 'react-icons/gr';
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
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 8,
  overflowY: 'scroll',
};





export default function Suspect() {
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
  //var rendercell;
  useEffect(()=>{
    axios.get('http://localhost:5000/api/case/list')
    .then(response=> {
      const listofSuspect = []

      response.data.forEach(element => {
        element.id=element._id
        var caseLoc = element.locationOfCrime.split(", ");
        var superLoc = localStorage.getItem('supervisorLocation').split(", ");

        if (element.suspectName &&  caseLoc[0] === superLoc[0] && caseLoc[1] === superLoc[1] && caseLoc[2] === superLoc[2])
        {
          listofSuspect.push(element)
        }
      });
      setCases(listofSuspect);
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
      field: 'suspectName',
      headerName: 'Amazina',
      width: 150,
      editable: true,
    },
    {
      field: 'suspectAge',
      headerName: 'Imyaka ',
      width: 75,
      editable: true,
    },
    {
      field: 'suspectGender',
      headerName: ' Igitsina',
      width: 75,
      editable: true,
    },
    {
      field: 'supectResidence',
      headerName: 'Aho atuye',
      width: 150,
      editable: true,
    },
    { field: 'suspectPhoneNumber', 
    headerName: "telefoni y'uregwa ", 
    width: 150 
    },
    { field: 'firstWitness', 
    headerName: 'Umutanga buhamya', 
    width: 150 
    },
    { field: 'FWPhoneNumber', 
    headerName: " Telefoni y'umutangabuhamya", 
    width: 150 
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
    <Helmet><title>Abaregwa</title></Helmet>
     <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
         <Typography variant="h4" gutterBottom>
            Lisiste y'abaregwa
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
         
          <SectionCategory>Amakuru ku kibazo</SectionCategory>
          <TwoSidedContainer>
            <LeftSide>
              <TwoSidedContainer>
                <LeftSide>
                  <strong>Icyaha:</strong>
                </LeftSide>
                <RightSide>
                  <p>{caseDetails.category}</p>
                </RightSide>
              </TwoSidedContainer>
              {(caseDetails.category === 'Abana bugarijwe' || caseDetails.category === 'Kuva mwishuri') ? 
              <></>
              :
              <>
                <TwoSidedContainer>
                  <LeftSide>
                    <strong>Amazina y'ukekwa:</strong>
                  </LeftSide>
                  <RightSide>
                    <p>{caseDetails.suspectName}</p>
                  </RightSide>
                </TwoSidedContainer>
                <TwoSidedContainer>
                  <LeftSide>
                    <strong>Imyaka y'ukekwa:</strong>
                  </LeftSide>
                  <RightSide>
                    <p>{caseDetails.suspectAge}</p>
                  </RightSide>
                </TwoSidedContainer>
                <TwoSidedContainer>
                  <LeftSide>
                    <strong>Igitsina cy'ukekwa:</strong>
                  </LeftSide>
                  <RightSide>
                    <p>{caseDetails.suspectGender}</p>
                  </RightSide>
                </TwoSidedContainer>
              </>
              }
             
             
            </LeftSide>
            <RightSide>
              {(caseDetails.category === 'Abana bugarijwe' || caseDetails.category === 'Kuva mwishuri') ? 
                <></>
                :
                <>
                 <TwoSidedContainer>
                  <LeftSide>
                    <strong>Numero y'ukekwa:</strong>
                  </LeftSide>
                  <RightSide>
                    <p>{caseDetails.suspectPhoneNumber}</p>
                  </RightSide>
                 </TwoSidedContainer>
                  <TwoSidedContainer>
                    <LeftSide>
                      <strong>Aho ukekwa atuye:</strong>
                    </LeftSide>
                    <RightSide>
                      <p>{caseDetails.supectResidence}</p>
                    </RightSide>
                  </TwoSidedContainer>
                  <TwoSidedContainer>
                    <LeftSide>
                      <strong>Aho icyaha cyabereye:</strong>
                    </LeftSide>
                    <RightSide>
                      <p>{caseDetails.locationOfCrime}</p>
                    </RightSide>
                  </TwoSidedContainer>
                  
                </>
              }
            </RightSide>
          </TwoSidedContainer>
          <hr />
          <Button  
            variant="contained" 
            onClick={()=> {  
              localStorage.setItem('filter', caseDetails._id);
              navigate('/dashboard/Cases');
            }}>
            Amakuru y'ikirego
          </Button>

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

