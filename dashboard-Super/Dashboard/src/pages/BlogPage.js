import React, { useState, useEffect } from 'react'; 
import { Helmet } from 'react-helmet-async';
import { Grid, Container, Stack, Typography, ListItemButton, ListItemText, TextField, Alert } from '@mui/material';
import { BlogPostCard } from '../sections/@dashboard/blog';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import ExpandLess from '@mui/material/Collapse';
import ExpandMore from '@mui/material/Collapse';
import { LoadingButton } from '@mui/lab';

const style = {
  position: 'absolute',
  top: '0%',
  right: '0%',
  width: 800,
  height: '100vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function BlogPage() {
  const navigate = useNavigate();

  // States
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [blogPicture, setBlogPicture] = useState('');
  const [data, setData] = useState({});
  const [open2, setOpen2] = useState(true);
  const [posts, setPost] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [editable, setEditable] = useState(false);
  
  useEffect(() => {
    axios.get(`http://localhost:5000/api/blog/list`)
    .then(response => { setPost(response.data) })
    .catch(error => console.log(error));
  }, [])

  // Function
  const handleClose = () => setOpen(false);
  const handleBlogData = ({currentTarget: input })=>{ setData({...data, [input.name]: input.value}); };
  const handleAttachment = e => { 
    const { files } = e.target;
    setBlogPicture(files[0]);
  }

  const resetInputs = () => { setData({ blogTitle: "", blogBody: "",blogDate: "", blogPicture: "" }) }

  const handleSubmit = (e) => {
    e.preventDefault();

    // const config = { headers: { "Content-Type":"multipart/form-data" }}
    
    data.blogPicture = blogPicture;

    console.log(data);

    if (!data.blogTitle || !data.blogBody) {
      setError('All fields are required!');
      return;
    } else {
      console.log(data);

      var LINK = `http://localhost:5000/api/blog/update?id=${data._id}`;
      setError('');
      resetInputs();
      axios.put( LINK, { blogTitle: data.blogTitle, blogBody: data.blogBody })
      .then(response => {
        setSuccessMessage(response.data.message);
        setTimeout(()=> { 
          window.location.reload(); 
        }
        ,3000)})
      .catch(error=> { if (error.response && error.response.status >= 400 && error.response.status <= 500) { setError(error) } });
    } 
  };

  if(successMessage) { setTimeout(() => { setSuccessMessage('') }, 5000) }  

  return (
    <>
      <Helmet><title> Dashboard: Ipfasha nyigisho </title></Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>Ipfasha nyigisho</Typography>
        </Stack>

        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <BlogPostCard 
              setOpen={setOpen}
              open={open}
              setSelectedItem={setSelectedItem}
              setData={setData}
              key={post.id} 
              setEditable={setEditable}
              post={{
                blogId: post._id,
                blogTitle: post.blogTitle, 
                blogBody: post.blogBody, 
                blogDate: post.blogDate,
                blogPicture: `http://localhost:5000/api/blog/uploads/${post.blogPicture}`,
                picture: post.blogPicture
              }} 
              index={index} />
          ))}
        </Grid>
      </Container>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        {editable ? 
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', gap: '20px' }}>
                <TextField name="blogTitle" required size='small' value={data.blogTitle || ''} onChange={handleBlogData} label="Title" />
                <TextField name="blogBody" required size='small' multiline rows={4} value={data.blogBody || ''} onChange={handleBlogData} label="Body" />
                {/* <TextField type='file' name="blogPicture" size='small' onChange={handleAttachment} /> */}
              </div>
              
              {data.category === '' ? <></> : 
                <LoadingButton fullWidth size="large" style={{ background: '#1d518a'}} type="submit" variant="contained" sx={{marginTop: 0}}>Hindura Infashanyigisho</LoadingButton>
              }         
              {error && <Alert severity="error" sx={{ marginTop: '20px', width:'900px' }}>{error}</Alert>}
            </form>
          </Box>
        : 
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">{selectedItem.blogTitle}</Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>{selectedItem.blogBody}</Typography>
          </Box>
        }
      </Modal>
    </>
  );
}
