import { Button, Paper, Typography } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index';
import axios from 'axios'

const ShopCard = ({name, category, area, open, shopId}) => {
  const shops = useSelector(state => state.shops);
  const dispatch = useDispatch();
  const {setAllShops} = bindActionCreators(actionCreators, dispatch);
  const date = new Date();
  const isOpen = (open.indexOf(date.getDay())!==-1);

  const handleDeleteShop = async() => {
    const ans=window.confirm("Are you sure you want to delete this shop?");
    if(!ans)
      return;
    console.log(shopId)
    try {
      await axios.delete(
        `http://localhost:8000/api/shop/${shopId}`
      ).then(res => {
        console.log(res.data);
        const newShopsArray = shops.filter(shop => {
          return(shop._id!==shopId)
        })
        setAllShops(newShopsArray);
      }).catch(err => {
        console.log(err);
      });
    } catch (error) {
      console.log(error);
    }
  } 
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
        <div style={{width: 70, margin: 'auto', marginTop: 20}}>
          <Button variant='contained' onClick={handleDeleteShop} style={{ background: 'rgb(214, 214, 214)', textTransform: 'none', margin: 'auto', width: '100%', color: 'rgb(247, 2, 2)', boxShadow: 'none'}}>
            Delete
          </Button>
        </div>
      </Paper>
    </div>
  )
}

export default ShopCard