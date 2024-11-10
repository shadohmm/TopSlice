const { cartItem } = require('../config/schemas');

const CartItem = require('../models/dbModels').CartItem;
const CheckoutDetails = require('../models/dbModels').CheckoutDetails;

const addToCart = async (req,res) =>{
    try {
        const {userId,pizzaId,pizzaName,pizzaPrice,pizzaImage,pizzaQuantity,pizzaDescription} = req.body;
        // Check if user with given pizzaId exists
        await CartItem.findOne({ userId, pizzaId })
        .then(async (cartItem) => {
            if (cartItem) {
                // If user with given pizzaId exists, update the quantity
                cartItem.pizzaQuantity += pizzaQuantity;
                cartItem.pizzaPrice +=pizzaPrice;
                await cartItem.save();
                res.status(200).json({ message: 'Pizza Quantity has increased successfully' });
            } else {
                // If user with given pizzaId does not exist, create a new cart item
                const newCartItem = new CartItem({ userId, pizzaId, pizzaName, pizzaPrice, pizzaImage, pizzaQuantity,pizzaDescription });
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
        const {userId} = req.params;
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

const removePizzaFromCart = async (req, res) => {
    try {
        const { userId, pizzaIds } = req.body;
        console.log("idss",pizzaIds)
        // Check if pizzaIds is a valid array
        if (!Array.isArray(pizzaIds) || pizzaIds.length === 0) {
            return res.status(400).json({ error: 'Invalid pizzaIds array' });
        }

        // Delete all cart items where userId matches and pizzaId is in the pizzaIds array
        const result = await CartItem.deleteMany({ userId, pizzaId: { $in: pizzaIds } });

        if (result.deletedCount > 0) {
            res.status(200).json({ message: `${result.deletedCount} pizzas removed from cart successfully` });
        } else {
            res.status(404).json({ error: 'No pizzas found in cart for the given IDs' });
        }
    } catch (error) {
        console.error('Error removing pizza from cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const checkoutDetails = async (req, res) => {
    try {
        const { userId, name, address, city, state, zip, phone } = req.body;
        
        const details = await CheckoutDetails.findOne({ userId });
        
        if (details) {
            // If user with the given userId exists, update the details
            details.name = name;
            details.address = address;
            details.city = city;
            details.state = state;
            details.zip = zip;
            details.phone = phone;
            
            await details.save();
            return res.status(200).json({ message: 'Delivery address details are updated' });
        } else {
            // If no details exist for the user, create a new record
            const newCheckoutDetails = new CheckoutDetails({ userId, name, address, city, state, zip, phone });
            await newCheckoutDetails.save();
            return res.status(201).json({ message: 'Delivery address details are recorded' });
        }
    } catch (error) {
        console.error('Error adding checkout details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


const getCheckoutDetails = async (req,res) =>{
    try {
        const {userId} = req.params;
        // Check if user with given pizzaId exists
        const checkoutDetails = await CheckoutDetails.findOne({ userId})
        if (checkoutDetails) {
            res.status(200).json({ checkoutDetails });
        } else {
            res.status(200).json({ checkoutDetails: null });
        }
    }catch (error) {
        console.error('Error fetching checkout details:', error);
        res.status(500).json({ error: 'Internal server error while getching the checkout details' });
    }
}

module.exports ={
    addToCart,
    updateQuantityOfPizza,
    getShopingCart,
    removePizzaFromCart,
    checkoutDetails,
    getCheckoutDetails
};