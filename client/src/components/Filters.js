import { Button, Grid, MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { areas, categories } from '../utils/lists';
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index';

const Filters = () => {
  const dispatch = useDispatch();
  const {setAllShops} = bindActionCreators(actionCreators, dispatch);
  const [areaFilter, setAreaFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [openCloseFilter, setOpenCloseFilter] = useState('');
  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  }
  const handleAreaFilterChange = (e) => {
    setAreaFilter(e.target.value);
  }
  const handleisOpenChange = (e) => {
    setOpenCloseFilter(e.target.value)
  }

  const fetchShops = async () => {
    try {
      await axios.post('http://localhost:8000/api/shop/getshops', {
        areaFilter, categoryFilter, openCloseFilter
      }).then(res => {
        setAllShops(res.data);
      }).catch(err =>{
        console.log(err);
      })
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchShops();
  }, [areaFilter, categoryFilter, openCloseFilter])
  return (
    <div>
      {/* <Paper elevation={3}> */}
        <div>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <div style={{display: 'flex', width: 'fit-content', margin: 'auto', marginBottom: 20}}>
                <Typography style={{fontSize: 18, marginRight: 10, marginTop: 4}}>
                  Category:
                </Typography>
                <Select
                  style={{width: 180, height: 40}}
                  value={categoryFilter}
                  onChange={handleCategoryFilterChange}
                  displayEmpty
                  // renderValue={categoryFilter !== "" ? undefined : () => "All"}
                >
                  <MenuItem value={''}>All</MenuItem>
                  {
                    categories.map(cat => {
                      return(
                        <MenuItem value={cat.toLowerCase()}>{cat}</MenuItem>
                      )
                    })
                  }
                </Select>
              </div>
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <div style={{display: 'flex', width: 'fit-content', margin: 'auto', marginBottom: 20}}>
                <Typography style={{fontSize: 18, marginRight: 10, marginTop: 4}}>
                  Area:
                </Typography>
                <Select
                  style={{width: 180, height: 40}}
                  value={areaFilter}
                  onChange={handleAreaFilterChange}
                  displayEmpty
                  renderValue={areaFilter !== "" ? undefined : () => "All"}
                >
                  <MenuItem value={''}>All</MenuItem>
                  {
                    areas.map(ara => {
                      return(
                        <MenuItem value={ara.toLowerCase()}>{ara}</MenuItem>
                      )
                    })
                  }
                </Select>
              </div>
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <div style={{display: 'flex', width: 'fit-content', margin: 'auto', marginBottom: 10}}>
                <Typography style={{fontSize: 18, marginRight: 10, marginTop: 4}}>
                  Status:
                </Typography>
                <Select
                  style={{width: 180, height: 40}}
                  value={openCloseFilter}
                  onChange={handleisOpenChange}
                  displayEmpty
                  renderValue={openCloseFilter !== "" ? undefined : () => "All"}
                >
                  <MenuItem value={''}>All</MenuItem>
                  <MenuItem value={'open'}>Open</MenuItem>
                  <MenuItem value={'closed'}>Closed</MenuItem>
                </Select>
              </div>
            </Grid>
          </Grid>
        </div>
      {/* </Paper> */}
    </div>
  )
}

export default Filters