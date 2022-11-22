const { addShop, getShops, deleteShop } = require('../controllers/shopController');
const router = require('express').Router();

router.post('/addshop', addShop);

router.post('/getshops', getShops);
// router.get('/sayhello', sayHello);

router.delete('/:id', deleteShop);

module.exports = router