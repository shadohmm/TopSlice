const { cartItem } = require('../config/schemas');

const CartItem = require('../models/dbModels').CartItem;

const addToCart = async (req,res) =>{
    try {
        const {userId,pizzaId,pizzaName,pizzaPrice,pizzaImage,pizzaQuantity} = req.body;
        // Check if user with given pizzaId exists
        await CartItem.findOne({ userId, pizzaId })
        .then(async (cartItem) => {
            if (cartItem) {
                // If user with given pizzaId exists, update the quantity
                cartItem.pizzaQuantity += pizzaQuantity;
                await cartItem.save();
                res.status(200).json({ message: 'Pizza Quantity has increased successfully' });
            } else {
                // If user with given pizzaId does not exist, create a new cart item
                const newCartItem = new CartItem({ userId, pizzaId, pizzaName, pizzaPrice, pizzaImage, pizzaQuantity });
                await newCartItem.save();
                res.status(201).json({ message: 'Pizza added to cart successfully' });
            }
        })
        .catch(async (error) => {
            console.error('Error adding pizza to cart:', error);
            res.status(500).json({ error: 'Internal server error' });
        });

        
    }catch (error) {
        console.error('Error adding pizza to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateQuantityOfPizza = async (req,res) => {
    try {
        const {userId,pizzaId,increaseItem} = req.body;
        let updateMessage = '';
        // Check if user with given pizzaId exists
        await CartItem.findOne({ userId, pizzaId })
        .then(async (cartItem) =>{
            if (cartItem) {
                // If user with given pizzaId exists, update the quantity
                if (increaseItem) {
                    
                    cartItem.pizzaQuantity += 1;
                    updateMessage = 'Pizza Quantity has increased successfully';
                } else {
                    cartItem.pizzaQuantity -= 1;
                    updateMessage = 'Pizza Quantity has decreased successfully';
                }
                // cartItem.pizzaQuantity = pizzaQuantity;
                await cartItem.save();
                res.status(200).json({ message: updateMessage });
            } else {
                res.status(404).json({ error: 'Pizza not found in cart' });
            }
        })
    }catch (error) {
        console.error('Error updating pizza quantity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getShopingCart = async (req,res) =>{
    try {
        const {userId} = req.body;
        // Check if user with given pizzaId exists
        const cartItems = await CartItem.find({ userId })
        
        if (cartItems) {
            res.status(200).json({ cartItems });
        } else {
            res.status(404).json({ error: 'Cart is empty' });
        }
       
    }catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const removePizzaFromCart = async (req,res) =>{
    try {
        const {userId,pizzaId} = req.body;
        // Check if user with given pizzaId exists
        const cartItem = await CartItem.findOne({ userId, pizzaId });
        if (cartItem) {
            await cartItem.deleteOne()
            res.status(200).json({ message: 'Pizza removed from cart successfully' });
        } else {
            res.status(404).json({ error: 'Pizza not found in cart' });
        }
    }catch (error) {
        console.error('Error removing pizza from cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports ={
    addToCart,
    updateQuantityOfPizza,
    getShopingCart,
    removePizzaFromCart
};