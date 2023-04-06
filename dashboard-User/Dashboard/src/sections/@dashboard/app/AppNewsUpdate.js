import PropTypes from 'prop-types';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
import { fToNow } from '../../../utils/formatTime';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { useNavigate } from 'react-router-dom';

AppNewsUpdate.propTypes = { title: PropTypes.string, subheader: PropTypes.string, list: PropTypes.array.isRequired };

export default function AppNewsUpdate({ title, subheader, list, setOpen, selectedItem, setSelectedItem, ...other }) {
  const navigate = useNavigate();
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list.map((news) => (
            <NewsItem key={news.id} news={news} setOpen={setOpen} setSelectedItem={setSelectedItem} selectedItem={selectedItem} />
          ))}
        </Stack>
      </Scrollbar>
      <Divider />
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button size="small" color="inherit" onClick={() => {navigate('/dashboard/blog')}} endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
          Izindi mfashanyigisho
        </Button>
      </Box>
    </Card>
  );
}

NewsItem.propTypes = {
  news: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
    title: PropTypes.string,
  }),
};

function NewsItem({ news, setOpen, selectedItem, setSelectedItem }) {
  const { image, title, description, postedAt } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box component="img" alt={title} src={image} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link 
          onClick={() => {
            setOpen(true);
            setSelectedItem(news);
          }} 
          color="inherit" 
          variant="subtitle2" 
          underline="hover" noWrap>
          {title}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {fToNow(postedAt)}
      </Typography>
    </Stack>
  );
}
