import { Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import ShopCard from './ShopCard'

const ShopCards = () => {
  const shops = useSelector(state => state.shops);
  return (
    <div>
      <Grid container spacing={5}>
        {
          shops.map(shp => {
            return(
              <Grid item key={shp._id} lg={3} md={4} sm={6} xs={12}>
                <ShopCard shopId={shp._id} name={shp.name} area={shp.area} category={shp.category} open={shp.open}/>
              </Grid>
            )
          })
        }
      </Grid>
    </div>
  )
}

export default ShopCards