const express = require('express');
const router = express.Router();
const userRoute = require('./userRoute');
const pizzaRoute = require('./pizzaRoute');
const ingredientsRoute = require('./ingredientsRoute');
const cartRoute = require('./cartRoute');

router.post('/register', userRoute.register);
router.post('/login',userRoute.login);
router.post('/resetPassword',userRoute.forgotPassword);

router.post('/addPizza',pizzaRoute.addPizza);
router.get('/getPizza',pizzaRoute.getPizza);

router.get('/getIngredients',ingredientsRoute.getIngredients);

router.post('/addCartItem',cartRoute.addToCart);
router.post('/updateCartItem',cartRoute.updateQuantityOfPizza);
router.get('/getShopingCartItems',cartRoute.getShopingCart);
router.post('/removeCartItem',cartRoute.removePizzaFromCart);

module.exports = router;