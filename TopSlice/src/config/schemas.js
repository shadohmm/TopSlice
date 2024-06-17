const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    userName: String,
    password: String
});

const pizzaSchema = new mongoose.Schema({
    pizzaName: String,
    pizzaPrice: Number,
    pizzaImage: String,
    pizzaDescription: String,

});

const ingredientsSchema = new mongoose.Schema({
    ingredientName: String,
    ingredientPrice: Number
});

const cartItem = new mongoose.Schema({
    userId: String,
    pizzaId: String,
    pizzaName: String,
    pizzaPrice: Number,
    pizzaImage: String,
    pizzaQuantity: Number,
})

module.exports ={
    userSchema,
    pizzaSchema,
    ingredientsSchema,
    cartItem
};