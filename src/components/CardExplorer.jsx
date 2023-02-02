import { Avatar, Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const CardExplorer = ({ text = '', image = '', url = '' }) => {
  return (
    <Link to={url}>
      <Card variant="outlined">
        <CardContent>
          <Box textAlign="center">
            <img height="100px" width="auto" src={image} />
          </Box>
          <Typography textAlign="center" variant="h6" component="div">
            {text}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default CardExplorer