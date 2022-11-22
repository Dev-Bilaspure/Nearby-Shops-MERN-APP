const Shop = require('../models/Shop');

const addShop = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      area: req.body.area,
      category: req.body.category,
      open: req.body.openDays
    }
    const newShop = new Shop(data);
    const savedPost = await newShop.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
}

const getShops = async (req, res) => {
  try {
    const { areaFilter, categoryFilter, openCloseFilter } = req.body;
    const date = new Date();
    const day = date.getDay();

    const  tempShops = await Shop.find();

    const shops = tempShops.filter(shp => {
      return((areaFilter==='' ? true : shp.area===areaFilter) 
        && (categoryFilter==='' ? true : shp.category===categoryFilter) 
        && (openCloseFilter==='' ? true : (openCloseFilter==='open' ? shp.open.indexOf(day)!==-1 : shp.open.indexOf(day)===-1))
      )
    });
    res.status(200).json(shops);
  } catch(err) {
    res.status(500).json(err);
  }
}

// const sayHello = (req, res) => {
//   res.status(200).json('vitkijai');
// }

module.exports = {
  addShop,
  getShops,
  // sayHello
}