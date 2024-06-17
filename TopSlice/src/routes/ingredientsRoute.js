const Ingredient = require('../models/dbModels').Ingredient;

//get ingredients
const getIngredients = async (req,res) =>{
    try {
        const ingredients = await Ingredient.find();
        res.status(200).json(ingredients);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ingredients' });
    }
}

module.exports = {
    getIngredients
}