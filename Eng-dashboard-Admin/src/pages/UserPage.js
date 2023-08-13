import React, { useState , useEffect} from 'react';
import { GrView } from 'react-icons/gr';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Container, Stack,Typography,Button, Switch, TextField, NativeSelect } from '@mui/material';
import Modal from '@mui/material/Modal';
import { LeftSide, RightSide, SectionCategory, TextArea, TwoSidedContainer } from 'src/components/mycomp/CaseDetailsComponents';
import Message from 'src/components/mycomp/Message';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import API from 'src/utils/API';


const style = {
  position: 'absolute',
  top: '0',
  right: '0',
  height: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 8,
  overflowY: 'scroll',
  display: 'flex',
};

const stylesTwo = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  flexDirection: 'column',
  margin: '0 auto',
}

export default function CasesPage() {
  
  const navigate=useNavigate();
  const [cases, setCases] = useState([]);
  const [open, setOpen] = useState(false);
  const [caseDetails, setCaseDetails] = useState({});
  const [caseId, setCaseId] = useState('');
  const [progress, setProgress] = useState('');
  const [progress2, setProgress2] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState({ text:'', color:''});
  const [comment, setComment] = useState('');
  const [checked, setChecked] = useState(true);
  const [updatable, setUpdatable] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleComment = ({ currentTarget: input }) => { setComment(input.value) };
  const updateCase = ({ currentTarget: input }) => { setCaseDetails({ ...caseDetails, [input.name] : input.value }) };
  
  // Fetch user list
  useEffect(()=>{
    const filterValue = localStorage.getItem('filter');
    axios.get(`http://${API.host}:${API.port}/api/user/list`)
    .then(response=> {
      var filteredCases = [];
      response.data.forEach(element => {
        element.id=element._id;
        filteredCases.push(element);
      });
      setCases(filteredCases);
    })
    .catch(error => { console.log(error);})
  },[]);

  // Fetch user data
  const showCaseData = async (id) => {
    console.log("Case id: "+id);
    await axios.get(`http://${API.host}:${API.port}/api/user/findByID?id=${id}`)
    .then(response =>{
      setCaseDetails(response.data);
      handleOpen()
      setChecked(response.data.status === 'active' ? true : false);
    })
    .catch(error => console.log(error))
  }
  
  // Update user data
  const updateUser = (e) => {
    e.preventDefault();
    
    if (caseDetails.name === '' || caseDetails.nid === '' || caseDetails.phone === '' || caseDetails.email === '' || caseDetails.role === '' || caseDetails.status === '' ) {
      setMessage({text:'Nta makuru mashya watanze. Funga dosiye.', color: 'error'})
      setOpenSnackbar(true);
    } else {
      setProgress('Kohereza ...');
      setTimeout(()=>{
        axios.put(`http://${API.host}:${API.port}/api/user/update?id=${caseDetails._id}`, caseDetails)
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

  // Update user status
  const changeStatus = (userId) => {
    console.log(userId);
    if (caseDetails.status === 'banned') {
      caseDetails.status = 'active';
      setChecked(true);
    } else if (caseDetails.status === 'active') {
      caseDetails.status = 'banned';
      setChecked(false);
    }

    axios.put(`http://${API.host}:${API.port}/api/user/update?id=${userId}`, caseDetails)
    .then(response=> {
      setTimeout(()=>{
        console.log(response.message)
      },3000)    
    })
    .catch(error => console.log(error))
  }

  // Delete user account
  const deleteAccount = (userId) => {
    setProgress2('Gusiba ...');
    setTimeout(()=>{
      axios.delete(`http://${API.host}:${API.port}/api/user/delete?id=${userId}`)
      .then(response => {
        if (response.status === 201) {
          console.log(`http://${API.host}:${API.port}/api/user/delete?id=${userId}`);
          setMessage({text: response.data.message ,color: 'success'})
          setOpenSnackbar(true);
          setProgress2('');
          setTimeout(() => { window.location.reload() }, 3000);
        }
      })
      .catch(error=> { 
        if (error.response && error.response.status >= 400 && error.response.status <= 500) { 
          setError(error);
          setMessage({text: response.data.message ,color: 'success'});
          setOpenSnackbar(true);  
        } 
      });
    },3000);
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
      field: 'status',
      headerName: 'Imiterere',
      width: 230,
      editable: true,
    },  
    {
      field: 'role',
      headerName: 'Uruhare',
      width: 200,
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
      <Helmet><title>Lisite y'inshuti z'umuryango.</title></Helmet>
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

      {/* User details popup */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <form style={stylesTwo}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Button variant='contained' size='small' color='primary' onClick={() => setUpdatable(!updatable)}>
                { !updatable ? 'Hindura' : 'Subira inyuma' }
              </Button>
              {!updatable && <Button variant='contained' size='small' color='error' 
                onClick={(e) => {
                  e.preventDefault();
                  deleteAccount(caseDetails._id);
                }
              }>{ progress2 !== '' ? progress2 : 'Siba' }</Button>}
            </div>
            <hr />
            {updatable ?  
              <UpdateForm onSubmit={updateUser}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                    <TwoSidedContainer>
                      <LeftSide>
                        <strong>Amazina:</strong>
                      </LeftSide>
                      <RightSide>
                        <TextField type={'text'} size='small' name='name' value={caseDetails.name || ''} onChange={updateCase} />
                      </RightSide>
                    </TwoSidedContainer>
                    <TwoSidedContainer>
                      <LeftSide>
                        <strong>Indangamuntu:</strong>
                      </LeftSide>
                      <RightSide>
                        <TextField type={'text'} size='small' name='nid' value={caseDetails.nid || ''} onChange={updateCase} />
                      </RightSide>
                    </TwoSidedContainer>
                    <TwoSidedContainer>
                      <LeftSide>
                        <strong>Terefoni:</strong>
                      </LeftSide>
                      <RightSide>
                        <TextField type={'text'} size='small' name='phone' value={caseDetails.phone || ''} onChange={updateCase} />
                      </RightSide>
                    </TwoSidedContainer>
                    <TwoSidedContainer>
                      <LeftSide>
                        <strong>Imeri:</strong>
                      </LeftSide>
                      <RightSide>
                        <TextField type={'email'} size='small' name='email' value={caseDetails.email || ''} onChange={updateCase} />
                      </RightSide>
                    </TwoSidedContainer>
                    <TwoSidedContainer>
                      <LeftSide>
                        <strong>Uruhare:</strong>
                      </LeftSide>
                      <RightSide>
                        <NativeSelect variant='outlined' size='small' name='role' onChange={updateCase} sx={{padding:2}}>
                          <option value={''}>Select Role</option>
                          <option value={'Admin'}>Admin</option>
                          <option value={'Agent'}>Agent</option>
                          <option value={'Supervisor'}>Supervisor</option>
                        </NativeSelect>
                      </RightSide>
                    </TwoSidedContainer>
                    <TwoSidedContainer>
                      <LeftSide>
                        <strong>Imiterere ya konti:</strong>
                      </LeftSide>
                      <RightSide>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                          <Switch checked={checked} inputProps={{ 'aria-label': 'controlled' }}
                            onClick={(e)=> {
                              e.preventDefault();
                              changeStatus(caseDetails._id);                            
                            }}  
                          />
                        </div>
                      </RightSide>
                    </TwoSidedContainer>
                    <Button variant='contained' size='small' color='success' style={{ color: 'white' }} onClick={updateUser}>{ progress !== '' ? progress : 'Emeza' }</Button>
                  </div>
              </UpdateForm>
            :
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                </div>
            }
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

// Styled components
const UpdateForm = styled.form`
`;