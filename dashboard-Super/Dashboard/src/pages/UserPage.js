import React, { useState , useEffect} from 'react';
import { GrView } from 'react-icons/gr';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Container, Stack,Typography,Button, Switch } from '@mui/material';
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
  display: 'flex',
};

const stylesTwo = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  flexDirection: 'column',
  margin: '0 auto'
}

export default function CasesPage() {
  
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
    const filterValue = localStorage.getItem('filter');

    axios.get('http://localhost:5000/api/user/list')
    .then(response=> {
      var filteredCases = [];
      response.data.forEach(element => {

        element.id=element._id;
        var userLoc = element.sector;
        var superLoc = localStorage.getItem('supervisorLocation').split(", ");
        if ( userLoc === superLoc[2] && element.role === 'Agent') {  
          // Filtering children cases by filter
          if (filterValue && element._id === filterValue) {
            filteredCases.push(element);
          } 

          if (!filterValue) {
            filteredCases.push(element);
          }
        }
      });
      setCases(filteredCases);
    })
    .catch(error => { console.log(error);})
  },[]);

  const showCaseData = async (id) => {
    console.log("Case id: "+id);
    await axios.get(`http://localhost:5000/api/user/findByID?id=${id}`)
    .then(response =>{
      setCaseDetails(response.data);
      handleOpen()
      setChecked(response.data.status === 'active' ? true : false);
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
        axios.put(`http://localhost:5000/api/user/update?id=${caseDetails._id}`, caseDetails)
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

  const [checked, setChecked] = useState(true);

  const changeStatus = (userId) => {
    console.log(userId);
    if (caseDetails.status === 'banned') {
      caseDetails.status = 'active';
      setChecked(true);
    } else if (caseDetails.status === 'active') {
      caseDetails.status = 'banned';
      setChecked(false);
    }

    axios.put(`http://localhost:5000/api/user/update?id=${userId}`, caseDetails)
    .then(response=> {
      setTimeout(()=>{
        console.log(response.message)
      },3000)    
    })
    .catch(error => console.log(error))
  }

  const columns = [
    { 
      field: 'name', 
      headerName: 'Amazina', 
      width: 250 
    },
    {
      field: 'email',
      headerName: "Imeri",
      width: 250,
      editable: true,
    },
    {
      field: 'phone',
      headerName: 'Telefoni',
      width: 150,
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Imiterere',
      width: 120,
      editable: true,
    },
    {
      field: 'cell',
      headerName: 'Umudugudu',
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
      <Helmet><title>Lisite y'inshuti z'umuryango. Ku rwego rw'umudugudu.</title></Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>Lisite y'inshuti z'umuryango. Ku rwego rw'umudugudu.</Typography>
          <div>
            {localStorage.getItem('filter') !== '' && 
              <Button  variant="outlined" 
                sx={{ marginRight: '10px', boxShadow: '0 4px 8px 0 #d1e9fc'}}
                onClick={()=> {
                  localStorage.setItem('filter', '');
                  window.location.reload();
                  }
                }>Ibibazo Byose</Button>
            }
          </div>
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
          <form style={stylesTwo}>
            <SectionCategory style={{ textAlign: 'left' }}>Umwirondoro</SectionCategory>
            <hr />
            <TwoSidedContainer>
              <LeftSide>
                <TwoSidedContainer>
                  <LeftSide>
                    <strong>Amazina:</strong>
                  </LeftSide>
                  <RightSide>
                    <p>{caseDetails.name}</p>
                  </RightSide>
                </TwoSidedContainer>
                <TwoSidedContainer>
                  <LeftSide>
                    <strong>Indangamuntu:</strong>
                  </LeftSide>
                  <RightSide>
                    <p>{caseDetails.nid}</p>
                  </RightSide>
                </TwoSidedContainer>
                <TwoSidedContainer>
                  <LeftSide>
                    <strong>Terefoni:</strong>
                  </LeftSide>
                  <RightSide>
                    <p>{caseDetails.phone}</p>
                  </RightSide>
                </TwoSidedContainer>
                <TwoSidedContainer>
                  <LeftSide>
                    <strong>Emeri:</strong>
                  </LeftSide>
                  <RightSide>
                    <p>{caseDetails.email}</p>
                  </RightSide>
                </TwoSidedContainer>
              </LeftSide>
              <RightSide>
                <TwoSidedContainer>
                  <LeftSide>
                    <strong>Aho atuye:</strong>
                  </LeftSide>
                  <RightSide>
                    <p>{caseDetails.province+", "+caseDetails.district+", "+caseDetails.sector+", "+caseDetails.cell}</p>
                  </RightSide>
                </TwoSidedContainer>
                <TwoSidedContainer>
                  <LeftSide>
                    <strong>Uruhare:</strong>
                  </LeftSide>
                  <RightSide>
                    <p>{caseDetails.role}</p>
                  </RightSide>
                </TwoSidedContainer>
                <TwoSidedContainer>
                  <LeftSide>
                    <strong>Imiterere ya konti:</strong>
                  </LeftSide>
                  <RightSide>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <p>{caseDetails.status}</p>
                      <Switch 
                        checked={checked}
                        inputProps={{ 'aria-label': 'controlled' }}
                        onClick={(e)=> {
                          e.preventDefault();
                          changeStatus(caseDetails._id)                            
                        }}  
                      />
                    </div>
                  </RightSide>
                </TwoSidedContainer>
              </RightSide>
            </TwoSidedContainer>
          </form>
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

