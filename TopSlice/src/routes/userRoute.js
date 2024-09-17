const {User} = require('../models/users');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret'; // Use environment variables for secrets

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if(user) {
            return res.status(201).json({message: 'User already exists'});
        }else {
            const newUser = new User({ email, password });
            await newUser.save();
            res.status(201).json({ message: 'User added successfully' });
        }
    }
    catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        // Check if userName and password are present in the database
        const user = await User.findOne({ email });
        console.log("user",user);
        
        if (!user || !(await user.comparePassword(password))) {
            // Invalid credentials
            res.status(401).json({ error: 'Invalid credentials' });
        } else {
            // Login successful
            // res.status(200).json({ message: 'Login successful', user});
            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        }

    }catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send(error.message);
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