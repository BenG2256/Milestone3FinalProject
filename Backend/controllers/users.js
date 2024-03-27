const router = require('express').Router()
const db = require("../models")


const { Users } = db

// create user route with encryption


//create user route without encryption
router.post('/', async (req, res) => {
    let { password, ...rest } = req.body;
    console.log("the password is: ", password)

    const users = await Users.create({
        ...rest,
        password: password
    })
    res.json(users)
    console.log("user creation password: ", password)

})


router.get('/', async (req, res) => {
    const users = await Users.findAll()
    res.json(users)
})

module.exports = router