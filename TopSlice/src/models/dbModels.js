const mongoose = require('mongoose');
const userSchema = require('../config/schemas').userSchema;
const pizzaSchema = require('../config/schemas').pizzaSchema;
const ingredientsSchema = require('../config/schemas').ingredientsSchema;
const cartItem = require('../config/schemas').cartItem;
const checkoutDetails = require('../config/schemas').checkoutDetails;

// const User = mongoose.model('User', userSchema);
const Pizza = mongoose.model('Pizza', pizzaSchema);
const Ingredient = mongoose.model('Ingredient', ingredientsSchema);
const CartItem = mongoose.model('ShopingCart', cartItem);
const CheckoutDetails = mongoose.model('CheckoutDetails', checkoutDetails);
module.exports = {
    Pizza,
    Ingredient,
    CartItem,
    // User
    CheckoutDetails
};