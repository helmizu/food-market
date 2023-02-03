import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import RemoveIcon from '@mui/icons-material/RemoveCircleOutline';
import Button from '@mui/material/Button';
import { formatToIdr } from '../utils/formatter';

const CardMenu = ({
  name,
  description,
  image = 'https://mui.com/static/images/cards/live-from-space.jpg',
  qty = 0,
  onChangeQty,
  price = 0,
}) => {
  return (
    <Card sx={{ display: 'flex', height: 160 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent>
          <Typography component="div" variant="h6" sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            'WebkitLineClamp': '1',
            'WebkitBoxOrient': 'vertical',
            lineClamp: '1',
            boxOrient: 'vertical',
            wordBreak: 'break-all',
            height: 32,
            maxWidth: '100%',
          }}>
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            component="div"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              'WebkitLineClamp': '2',
              'WebkitBoxOrient': 'vertical',
              lineClamp: '2',
              boxOrient: 'vertical',
              wordBreak: 'break-all',
              height: 40,
              maxWidth: '100%',
            }}
          >
            {description}
          </Typography>
          <Typography
            variant="subtitle2"
            component="div"
          >
            {formatToIdr(price)}
          </Typography>
          {!!qty && (
            <Box sx={{ display: 'flex', alignItems: 'center', pt: 0.5, gap: 1 }}>
              <IconButton onClick={() => onChangeQty(qty - 1)} disabled={qty <= 0}>
                <RemoveIcon color={qty > 0 ? "primary" : "secondary"} />
              </IconButton>
              <Typography variant="subtitle1" component="div">{qty}</Typography>
              <IconButton onClick={() => onChangeQty(qty + 1)}>
                <AddIcon color="primary" />
              </IconButton>
            </Box>
          )}
          {!qty && (
            <Box sx={{ display: 'flex', alignItems: 'center', pt: 1, gap: 1 }}>
              <Button onClick={() => onChangeQty(1)} variant="outlined" color="primary" sx={{ borderRadius: 4 }} fullWidth size="small">
                Add to Cart
              </Button>
            </Box>
          )}
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 160, height: 160 }}
        image={image}
        alt={name}
      />
    </Card >
  );
}

export default CardMenu;
