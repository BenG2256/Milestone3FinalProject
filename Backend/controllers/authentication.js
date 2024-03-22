const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { Users } = db

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email and password
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await Users.findOne({ where: { email } });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET);

        // Log successful login attempt
        console.log(`User ${email} logged in successfully`);

        // Send user data and token to the client
        res.json({ user, token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/profile', async (req, res) => {
    res.json(req.currentUser)
})

module.exports = router