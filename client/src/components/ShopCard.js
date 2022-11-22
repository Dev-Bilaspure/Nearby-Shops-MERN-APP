import { Button, Paper, Typography } from '@mui/material'
import React from 'react'

const ShopCard = ({name, category, area, open}) => {
  const date = new Date();
  const isOpen = (open.indexOf(date.getDay())!==-1);
  return (
    <div style={{width: '100%'}}>
      <Paper elevation={2} style={{width: '100%', paddingTop: 15, paddingBottom: 20}}>
        <div style={{width: 'fit-content', margin: 'auto', marginBottom: 20}}>
          <Typography style={{fontFamily: `'Roboto', 'sans-serif'`, fontSize: 22, fontWeight: 'bold'}}>
            {name}
          </Typography>
        </div>
        <div style={{display: 'flex', width: 'fit-content', margin: 'auto'}}>
          <Typography style={{fontWeight: 'bold', fontSize: 18}}>
            Category:
          </Typography>
          <Typography style={{marginLeft: 20, fontSize: 18}}>
            { category.charAt(0).toUpperCase() + category.slice(1)}
          </Typography>
        </div>
        <div style={{display: 'flex', width: 'fit-content', margin: 'auto', marginTop: 10}}>
          <Typography style={{fontWeight: 'bold', fontSize: 18}}>
            Area:
          </Typography>
          <Typography style={{marginLeft: 20, fontSize: 18}}>
            { area.charAt(0).toUpperCase() + area.slice(1)}
          </Typography>
        </div>
        <div style={{width: 120, margin: 'auto', marginTop: 20}}>
          <Button variant='contained' style={{cursor: 'default', background: (isOpen ? 'rgb(207, 255, 219)' : 'rgb(255, 207, 207)'), textTransform: 'none', margin: 'auto', width: '100%', color: (isOpen ? 'rgb(2, 150, 6)' : 'rgb(163, 7, 2)'), boxShadow: 'none'}}>
            {isOpen ? 'Open' : 'Closed'}
          </Button>
        </div>
      </Paper>
    </div>
  )
}

export default ShopCard