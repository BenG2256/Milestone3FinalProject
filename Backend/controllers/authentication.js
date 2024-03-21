const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')
const jwt = require('json-web-token')

const { Users } = db

router.post('/', async (req, res) => {

    let user = await Users.findOne({
        where: { email: req.body.email }
    })

    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
        res.status(404).json({ message: `Could not find a user with the provided username and password` })
    } else {
        const result = await jwt.encode(process.env.JWT_SECRET, { id: user.userId })
        res.json({ user: user, token: result.value })
    }
})

router.get('/profile', async (req, res) => {
    res.json(req.currentUser)
})

module.exports = router