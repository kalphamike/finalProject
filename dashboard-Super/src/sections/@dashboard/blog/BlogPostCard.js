import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardContent, Grid } from '@mui/material';
import { fDate } from '../../../utils/formatTime';
import SvgColor from '../../../components/svg-color';

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 1 / 2)',
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});


const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BlogPostCard({ open, setData, setEditable, setSelectedItem, setOpen, post, index }) {
  const { blogId, blogTitle, blogBody, blogDate, blogPicture, picture } = post;

  return (
    <Grid key={index} item xs={12} sm={6} md={3}>
      <Card sx={{ position: 'relative' }}>
        <StyledCardMedia>
          <SvgColor color="paper"
            src={blogPicture}
            sx={{ width: 80, height: 36, zIndex: 9, position: 'absolute', color: 'background.paper',}}
          />
          <StyledCover alt={blogTitle} src={blogPicture} />
        </StyledCardMedia>

        <CardContent sx={{ pt: 4, }}>
          {/* Created date */}
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            {fDate(blogDate)}
          </Typography>

          {/* Title */}
          <StyledTitle 
            color="inherit" 
            onClick={() => { 
              setOpen(true);
              setEditable(false);
              setSelectedItem(post);
            }} 
            variant="subtitle2" 
            underline="hover">{blogTitle}
          </StyledTitle>
          
          <StyledTitle 
            color="inherit" 
            onClick={() => { 
              setOpen(true);
              setData({
                _id: post.blogId, 
                blogTitle: post.blogTitle, 
                blogBody: post.blogBody, 
                blogDate: post.blogDate, 
                blogPicture: post.picture
              });
              setEditable(true);
            }} 
            variant="body1" 
            underline="hover">Edit
          </StyledTitle>

        </CardContent>
      </Card>
    </Grid>
  );
}
