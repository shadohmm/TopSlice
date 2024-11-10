const express = require('express');
const router = express.Router();
const userRoute = require('./userRoute');
const pizzaRoute = require('./pizzaRoute');
const ingredientsRoute = require('./ingredientsRoute');
const cartRoute = require('./cartRoute');
const auth = require('../middleware/auth');

router.post('/register', userRoute.register);
router.post('/login',userRoute.login);
router.post('/resetPassword',userRoute.forgotPassword);

router.post('/addPizza',pizzaRoute.addPizza);
router.get('/getPizza',pizzaRoute.getPizza);

router.get('/getIngredients',ingredientsRoute.getIngredients);

router.post('/addCartItem',cartRoute.addToCart);
router.post('/updateCartItem', auth, cartRoute.updateQuantityOfPizza);
router.get('/getShopingCartItems/:userId',cartRoute.getShopingCart);
router.post('/removeCartItem',cartRoute.removePizzaFromCart);

router.post('/checkoutDetails',cartRoute.checkoutDetails);
router.get('/getCheckoutDetails/:userId',cartRoute.getCheckoutDetails);

module.exports = router;