import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import { Button, Checkbox, LinearProgress, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { areas, categories, daysList } from '../utils/lists';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 5;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const AddShopDialog = ({handleDialogBoxClose, openDialogBox}) => {
  const dispatch = useDispatch();
  const {addNewShop} = bindActionCreators(actionCreators, dispatch);
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState('');
  const [openDays, setOpenDays] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  const handleAreaChange = (e) => {
    setArea(e.target.value)
  }
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  }
  const handleChange = (e) => {
    setOpenDays([...e.target.value]);
  }

  const handleSubmit = async() => {
    if(name==='' || area==='' || category==='' || openDays.length===0)
      return;
    try {
      setIsFetching(true);
      await axios.post('http://localhost:8000/api/shop/addshop', {
        name, area, category, openDays
      }).then(res => {
        addNewShop(res.data);
        setIsFetching(false);
        handleDialogBoxClose();
      }).catch(err => {
        setIsFetching(false);
        console.log(err);
      })
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  }
  return(
    <div>
      <Dialog onClose={handleDialogBoxClose} open={openDialogBox}>
        <div style={{width: 400, padding: 20, paddingRight: 20}}>
          <div style={{width: 120, margin: 'auto', marginBottom: 20}}>
            <Typography style={{fontFamily: `'Roboto', 'sans-serif'`, color: 'rgb(30, 30, 30)', fontSize: 25, fontWeight: 'bold'}}>
              Add Shop
            </Typography>
          </div>
          <div>
            <Typography style={{fontFamily: `'Roboto', 'sans-serif'`, color: 'rgb(30, 30, 30)', fontSize: 17}}>
              Name
            </Typography>
            <TextField variant="outlined" size='small' placeholder='Name' style={{width: '100%'}} value={name} onChange={(e) => {setName(e.target.value)}} />
          </div>
          <div style={{marginTop: 20}}>
            <Typography style={{fontFamily: `'Roboto', 'sans-serif'`, color: 'rgb(30, 30, 30)', fontSize: 17}}>
              Area
            </Typography> 
            <Select
              style={{width: '100%', height: 40}}
              value={area}
              onChange={handleAreaChange}
              displayEmpty
              renderValue={area !== "" ? undefined : () => "Area"}
            >
              {
                areas.map(ara => {
                  return(
                    <MenuItem value={ara.toLowerCase()}>{ara}</MenuItem>
                  )
                })
              }
            </Select>
          </div>
          <div style={{marginTop: 20}}>
            <Typography style={{fontFamily: `'Roboto', 'sans-serif'`, color: 'rgb(30, 30, 30)', fontSize: 17}}>
              Category
            </Typography> 
            <Select
              style={{width: '100%', height: 40}}
              value={category}
              onChange={handleCategoryChange}
              displayEmpty
              renderValue={category !== "" ? undefined : () => "Category"}
            >
              {
                categories.map(cat => {
                  return(
                    <MenuItem value={cat.toLowerCase()}>{cat}</MenuItem>
                  )
                })
              }
            </Select>
          </div>
          <div style={{marginTop: 20}}>
            <Typography style={{fontFamily: `'Roboto', 'sans-serif'`, color: 'rgb(30, 30, 30)', fontSize: 17}}>
              Open Days
            </Typography>
            <Select
              style={{width: '100%', height: 40}}
              displayEmpty
              multiple
              value={openDays}
              onChange={handleChange}
              renderValue={(selected) => (`${selected.length} days open`)}
              MenuProps={MenuProps}
            >
              {daysList.map((dy) => (
                <MenuItem key={dy.dayno} value={dy.dayno}>
                  <Checkbox checked={openDays.indexOf(dy.dayno) > -1} />
                  <ListItemText primary={dy.dayname} />
                </MenuItem>
              ))}
            </Select>
          </div>
          <div style={{width: '100%', marginTop: 30, marginBottom: 10}}>
            <Button onClick={handleSubmit} variant='contained' style={{background: 'rgb(80, 80, 80)', textTransform: 'none', margin: 'auto', width: '100%'}}>
              <Typography>Submit</Typography>
            </Button>
          </div>
        </div>
        {
          isFetching &&
          <LinearProgress color="inherit" />
        }
      </Dialog>

    </div>
  )
}


export default AddShopDialog;