const { addShop, getShops } = require('../controllers/shopController');
const router = require('express').Router();

router.post('/addshop', addShop);

router.post('/getshops', getShops);
// router.get('/sayhello', sayHello);

module.exports = router