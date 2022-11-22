export const addNewShop = (shop) => {
  return((dispatch) => {
    dispatch({
      type: 'addShop',
      payload: shop
    })
  })
}

export const setAllShops = (shops) => {
  return((dispatch) => {
    dispatch({
      type: 'setShops',
      payload: shops
    })
  })
}