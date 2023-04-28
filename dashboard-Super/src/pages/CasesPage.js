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
  const [editable, setEditable] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  useEffect(()=>{
    const filterValue = localStorage.getItem('filter');

    axios.get('http://localhost:5000/api/case/list')
    .then(response=> {
      var filteredCases = [];
      response.data.forEach(element => {

        element.id=element._id;
        var caseLoc = element.locationOfCrime.split(", ");
        var superLoc = localStorage.getItem('supervisorLocation').split(", ");

        if ( caseLoc[0] === superLoc[0] && caseLoc[1] === superLoc[1] && caseLoc[2] === superLoc[2]) {
          
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

  const updateCase = (e) => {
    e.preventDefault();


  }

  const columns = [
    { 
      field: 'category', 
      headerName: 'Icyiciro', 
      width: 250 
    },
    {
      field: 'nameOfVictime',
      headerName: "Amazina y'umwana",
      width: 250,
      editable: true,
    },
    {
      field: 'locationOfCrime',
      headerName: 'Aho byabereye',
      width: 150,
      editable: true,
    },
    {
      field: 'ReportDate',
      headerName: 'Igihe bitangiwe',
      width: 120,
      editable: true,
    },
    {
      field: 'DateOfCrime',
      headerName: 'Igihe byabereye',
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
      <Helmet><title> Lisite y'ibirego byatanzwe </title></Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>Lisite y'ibirego byatanzwe</Typography>
          <div>
            {localStorage.getItem('filter') !== '' && 
              <Button  variant="outlined" 
                sx={{ marginRight: '10px', boxShadow: '0 4px 8px 0 #d1e9fc'}}
                onClick={()=> {
                  localStorage.setItem('filter', '');
                  window.location.reload();
                  }
                }>Ibibazo Byose</Button>}
            
            <Button  variant="contained" onClick={()=> navigate('/dashboard/NewCase')}>Ikibazo Gishya</Button>
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
        
        { editable ?
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
            <SectionCategory>Amakuru ku kibazo</SectionCategory>
            <TwoSidedContainer>
              <LeftSide>
                <TwoSidedContainer>
                  <LeftSide>
                    <strong>Ikibazo:</strong>
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
                </>
                }
                <TwoSidedContainer>
                  <LeftSide>
                    <strong>Igihe icyaha cyabereye:</strong>
                  </LeftSide>
                  <RightSide>
                    <p>{caseDetails.DateOfCrime}</p>
                  </RightSide>
                </TwoSidedContainer>
                <TwoSidedContainer>
                  <LeftSide>
                    <strong>Igihe cyatangiwe:</strong>
                  </LeftSide>
                  <RightSide>
                    <p>{caseDetails.ReportDate}</p>
                  </RightSide>
                </TwoSidedContainer>
              </LeftSide>
              <RightSide>
                {(caseDetails.category === 'Abana bugarijwe' || caseDetails.category === 'Kuva mwishuri') ? 
                  <></>
                  :
                  <>
                    <TwoSidedContainer>
                      <LeftSide>
                        <strong>Umutangabuhamya:</strong>
                      </LeftSide>
                      <RightSide>
                        <p>{caseDetails.firstWitness}</p>
                      </RightSide>
                    </TwoSidedContainer>
                    <TwoSidedContainer>
                      <LeftSide>
                        <strong>Numero y'umutangabuhamya:</strong>
                      </LeftSide>
                      <RightSide>
                        <p>{caseDetails.FWPhoneNumber}</p>
                      </RightSide>
                    </TwoSidedContainer>
                    <TwoSidedContainer>
                      <LeftSide>
                        <strong>Umutangabuhamya (2):</strong>
                      </LeftSide>
                      <RightSide>
                        <p>{caseDetails.secondWitness}</p>
                      </RightSide>
                    </TwoSidedContainer>
                    <TwoSidedContainer>
                      <LeftSide>
                        <strong>Numero y'umutangabuhamya (2):</strong>
                      </LeftSide>
                      <RightSide>
                        <p>{caseDetails.SWPhoneNumber}</p>
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
                    <TwoSidedContainer>
                      <LeftSide>
                        <strong>Ubusobanuro:</strong>
                      </LeftSide>
                      <RightSide>
                        <p>{caseDetails.discription}</p>
                      </RightSide>
                    </TwoSidedContainer>
                  </>
                }
              </RightSide>
            </TwoSidedContainer>
            <hr />
            <SectionCategory>Ubusabe bwo guhindura amakuru</SectionCategory>
            {caseDetails.comment 
              ?
              <>
                <TwoSidedContainer>
                  <LeftSide>
                    <strong>Impinduka zasabwe:</strong>
                  </LeftSide>
                  <RightSide>
                    <p>{caseDetails.comment}</p>
                  </RightSide>
                </TwoSidedContainer>
              </>
              :
              <></>  
            }
          </Box>
        : 
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
          <SectionCategory>Amakuru ku kibazo</SectionCategory>
          <TwoSidedContainer>
            <LeftSide>
              <TwoSidedContainer>
                <LeftSide>
                  <strong>Ikibazo:</strong>
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
              </>
              }
              <TwoSidedContainer>
                <LeftSide>
                  <strong>Igihe icyaha cyabereye:</strong>
                </LeftSide>
                <RightSide>
                  <p>{caseDetails.DateOfCrime}</p>
                </RightSide>
              </TwoSidedContainer>
              <TwoSidedContainer>
                <LeftSide>
                  <strong>Igihe cyatangiwe:</strong>
                </LeftSide>
                <RightSide>
                  <p>{caseDetails.ReportDate}</p>
                </RightSide>
              </TwoSidedContainer>
            </LeftSide>
            <RightSide>
              {(caseDetails.category === 'Abana bugarijwe' || caseDetails.category === 'Kuva mwishuri') ? 
                <></>
                :
                <>
                  <TwoSidedContainer>
                    <LeftSide>
                      <strong>Umutangabuhamya:</strong>
                    </LeftSide>
                    <RightSide>
                      <p>{caseDetails.firstWitness}</p>
                    </RightSide>
                  </TwoSidedContainer>
                  <TwoSidedContainer>
                    <LeftSide>
                      <strong>Numero y'umutangabuhamya:</strong>
                    </LeftSide>
                    <RightSide>
                      <p>{caseDetails.FWPhoneNumber}</p>
                    </RightSide>
                  </TwoSidedContainer>
                  <TwoSidedContainer>
                    <LeftSide>
                      <strong>Umutangabuhamya (2):</strong>
                    </LeftSide>
                    <RightSide>
                      <p>{caseDetails.secondWitness}</p>
                    </RightSide>
                  </TwoSidedContainer>
                  <TwoSidedContainer>
                    <LeftSide>
                      <strong>Numero y'umutangabuhamya (2):</strong>
                    </LeftSide>
                    <RightSide>
                      <p>{caseDetails.SWPhoneNumber}</p>
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
                  <TwoSidedContainer>
                    <LeftSide>
                      <strong>Ubusobanuro:</strong>
                    </LeftSide>
                    <RightSide>
                      <p>{caseDetails.discription}</p>
                    </RightSide>
                  </TwoSidedContainer>
                </>
              }
            </RightSide>
          </TwoSidedContainer>
          <hr />
          <SectionCategory>Ubusabe bwo guhindura amakuru</SectionCategory>
          {caseDetails.comment 
            ?
            <>
              <TwoSidedContainer>
                <LeftSide>
                  <strong>Impinduka zasabwe:</strong>
                </LeftSide>
                <RightSide>
                  <p>{caseDetails.comment}</p>
                </RightSide>
              </TwoSidedContainer>
            </>
            :
            <></>  
          }
        </Box>  
      }
      <Button variant='contained' size='small' color='info' onClick={() => setEditable(!editable)}>Hindura Amakuru</Button>
      <Button variant='contained' size='small' color='info' onClick={updateCase}>Emeza guhindura amakuru</Button>
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

