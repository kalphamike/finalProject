import React, { useState, useEffect } from 'react'; 
import { Helmet } from 'react-helmet-async';
import { Grid, Container, Stack, Typography } from '@mui/material';
import { BlogPostCard } from '../sections/@dashboard/blog';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

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

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

export default function BlogPage() {
  const [posts, setPost] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blog/list`)
    .then(response => { setPost(response.data) })
    .catch(error => console.log(error));
  }, [])

  return (
    <>
      <Helmet><title> Dashboard: Ipfasha nyigisho </title></Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Ipfasha nyigisho
          </Typography>
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Post
          </Button> */}
        </Stack>

        {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack> */}

        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <BlogPostCard 
              setOpen={setOpen}
              open={open}
              setSelectedItem={setSelectedItem}
              key={post.id} 
              post={{
                blogId: post._id,
                blogTitle: post.blogTitle, 
                blogBody: post.blogBody, 
                blogDate: post.blogDate,
                blogPicture: `http://localhost:5000/api/blog/uploads/${post.blogPicture}`
              }} 
              index={index} />
          ))}
        </Grid>
      </Container>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {selectedItem.blogTitle}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {selectedItem.blogBody}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}