const router = require('express').Router()
const db = require("../models")


const { Users } = db

// create user route with encryption


//create user route without encryption
router.post('/', async (req, res) => {
    try {
        const { username, email, ...rest } = req.body;

        // Check if username or email already exists
        const existingUser = await Users.findOne({
            where: {
                [db.Sequelize.Op.or]: [{ username }, { email }]
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // If username and email are unique, create the user
        const newUser = await Users.create({
            username,
            email,
            ...rest
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/', async (req, res) => {
    const users = await Users.findAll()
    res.json(users)
})

router.delete('/:user_id', async (req, res) => {
    let user_id = req.params.user_id

    if (isNaN(user_id)) {
        res.status(404).json({ message: `Invalid id "${user_id}"`})
    } else {
        const user = await Users.findOne({
            where: {user_id: user_id}
        })
        if (!user) {
            res.status(404).json({message : `Could not find User with id"${user_id}"`})
        } else {
            await user.destroy()
            console.log("user deleted")
            res.json(user)
        }
    }
})

module.exports = router