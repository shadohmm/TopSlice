const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     email: { type: String, required: true },
//     password: { type: String, required: true },
// });

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
    totalPizzaPrice: {type: Number, default: 0},
    pizzaImage: String,
    pizzaQuantity: Number,
    pizzaDescription: String,
    isSelected: { type: Boolean, default: false }
})

module.exports ={
    // userSchema,
    pizzaSchema,
    ingredientsSchema,
    cartItem
};