const mongoose = require('mongoose');
const userSchema = require('../config/schemas').userSchema;
const pizzaSchema = require('../config/schemas').pizzaSchema;
const ingredientsSchema = require('../config/schemas').ingredientsSchema;
const cartItem = require('../config/schemas').cartItem;

// const User = mongoose.model('User', userSchema);
const Pizza = mongoose.model('Pizza', pizzaSchema);
const Ingredient = mongoose.model('Ingredient', ingredientsSchema);
const CartItem = mongoose.model('ShopingCart', cartItem);

module.exports = {
    Pizza,
    Ingredient,
    CartItem
    // User
};