import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import RemoveIcon from '@mui/icons-material/RemoveCircleOutline';
import { formatToIdr } from '../utils/formatter';
import { Button, Stack } from '@mui/material';
import dayjs from 'dayjs';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(1.5)' }}
  >
    •
  </Box>
);

const CardOrder = ({
  name = '',
  items = [],
  totalPrice = 0,
  image = 'https://mui.com/static/images/cards/live-from-space.jpg',
  status = '',
  onUpdateStatus,
  updatedAt = '',
}) => {
  return (
    <Card sx={{ display: 'flex', height: 80, alignItems: 'center', gap: 2, flexDirection: 'row' }}>
      <CardMedia
        component="img"
        sx={{ width: 80, height: 80 }}
        image={image}
        alt={name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Box>
          <Typography component="div" variant="subtitle1" fontWeight={500}>
            {name}
          </Typography>
          <Typography
            variant="subtitle2"
            fontWeight={500}
            color="text.secondary"
            component="div"
          >
            {items?.length} {items?.length > 1 ? 'items' : 'item'} {bull} {formatToIdr(totalPrice)}
          </Typography>
        </Box>
      </Box>
      {(status === 'In Progress' || !status) && (
        <Box alignItems="center" justifyContent="center" display="flex" gap={1} pr={2}>
          <Button sx={{ width: 100 }} onClick={() => onUpdateStatus('Completed')} variant="outlined" color="primary">Complete</Button>
          <Button sx={{ width: 100 }} onClick={() => onUpdateStatus('Cancelled')} color="error">Cancel</Button>
        </Box>
      )}
      {(!!status && status !== 'In Progress') && (
        <Box alignItems="flex-end" justifyContent="center" display="flex" gap={1} pr={2} flexDirection="column">
          <Typography variant="caption">{dayjs(updatedAt?.toDate?.()).format('MMM DD YYYY, HH:mm')}</Typography>
          <Typography variant="caption" color={status === 'Cancelled' ? 'error.main' : 'primary.main'}>{status}</Typography>
        </Box>
      )}
    </Card >
  );
}

export default CardOrder;
