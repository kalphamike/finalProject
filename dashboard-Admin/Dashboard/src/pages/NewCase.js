import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Alert, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/material/Collapse';
import ExpandMore from '@mui/material/Collapse';


export default function NewCase() {
  const navigate = useNavigate();

  // States
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [blogPicture, setBlogPicture] = useState('');
  const [data, setData] = useState({});
  const [open2, setOpen2] = useState(true);
  
  // Function
  const handleBlogData = ({currentTarget: input })=>{ setData({...data, [input.name]: input.value}); };
  const handleAttachment = e => { 
    const { files } = e.target;
    setBlogPicture(files[0]);
  }

  const resetInputs = () => { setData({ blogTitle: "", blogBody: "",blogDate: "", blogPicture: "" }) }

  const handleSubmit = (e) => {
    e.preventDefault();

    const config = { headers: { "Content-Type":"multipart/form-data" }}
    
    data.blogDate = new Date();
    data.blogPicture = blogPicture;

    console.log(data);

    if (!data.blogTitle || !data.blogBody || !data.blogPicture) {
      setError('All fields are required!');
      return;
    } else {
      var LINK = 'http://localhost:5000/api/blog/save';
      setError('');
      resetInputs();
      axios.post(LINK, data, config)
      .then(response => {
        setSuccessMessage(response.data.message);
        setTimeout(()=>
        { navigate('/dashboard/blog') 
      }
        ,3000)})
      .catch(error=> { if (error.response && error.response.status >= 400 && error.response.status <= 500) { setError(error) } });
    } 
  };

  if(successMessage) { setTimeout(() => { setSuccessMessage('') }, 5000) }
  
  return (
    <>
      <Helmet><title> Imfashanyigisho Nshya </title></Helmet>

      <Box sx={{ padding: '40px'}}>
        <form onSubmit={handleSubmit}>
          <ListItemButton style={{ background: "#2065d1", color: "white", borderBottom: "1px solid white"}}>
            <ListItemText primary="Infashanyigisho nshya" />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', gap: '20px' }}>
            <TextField name="blogTitle" required size='small' value={data.blogTitle || ''} onChange={handleBlogData} label="Title" />
            <TextField name="blogBody" required size='small' multiline rows={4} value={data.blogBody || ''} onChange={handleBlogData} label="Body" />
            <TextField type='file' name="blogPicture" required size='small' onChange={handleAttachment} />
          </div>
          
          {data.category === '' ? <></> : 
            <LoadingButton fullWidth size="large" style={{ background: '#1d518a'}} type="submit" variant="contained" sx={{marginTop: 0}}>Kora Imfashanyigisho</LoadingButton>
          }         
          {error && <Alert severity="error" sx={{ marginTop: '20px', width:'900px' }}>{error}</Alert>}
        </form>
      </Box>
    </>
  );
}