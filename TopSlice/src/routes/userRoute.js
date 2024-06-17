const User = require('../models/dbModels').User;

const register = async (req, res) => {
    try {
        const { email, userName, password } = req.body;
        const user = await User.findOne({email,userName});
        if(user) {
            return res.status(400).json({error: 'User already exists'});
        }else {
            const newUser = new User({ email, userName, password });
            await newUser.save();
            res.status(201).json({ message: 'User added successfully',newUser });
        }
    }
    catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const {userName, password} = req.body;
        // Check if userName and password are present in the database
        const user = await User.findOne({ userName, password });
        if (user) {
            // Login successful
            res.status(200).json({ message: 'Login successful', user});
        } else {
            // Invalid credentials
            res.status(401).json({ error: 'Invalid credentials' });
        }

    }catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const forgotPassword = async (req,res) =>{
    try{
        const {email,userName,newPassword} = req.body;
        const user = await User.findOne({email,userName});
        if(user){
            user.password = newPassword;
            await user.save();
            res.status(200).json({message: 'Password updated successfully', user});
        }

    }catch(error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    register,
    login,
    forgotPassword
};