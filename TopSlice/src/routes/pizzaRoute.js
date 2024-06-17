const Pizza = require('../models/dbModels').Pizza;

const getPizza = async (req,res) =>{
    try {
        const pizzas = await Pizza.find();
        res.status(200).json(pizzas);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch pizzas' });
    }
}

const addPizza = async (req,res) =>{
    try {
        const {pizzaName,pizzaDescription,pizzaPrice,pizzaImage} = req.body;
        const newPizza = new Pizza({ pizzaName, pizzaDescription, pizzaPrice, pizzaImage});
        await newPizza.save();
        res.status(201).json({ message: 'Pizza added successfully',newPizza });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add pizza' });
    }
}

module.exports = {
    getPizza,
    addPizza
};