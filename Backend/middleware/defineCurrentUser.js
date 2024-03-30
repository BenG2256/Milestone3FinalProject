const db = require("../models");
const jwt = require('jsonwebtoken');

const { User } = db;

async function defineCurrentUser(req, res, next) {
    try {
        const [method, token] = req.headers.authorization.split(' ')
        if (method == 'Bearer') {
            const result = await jwt.decode(process.env.JWT_SECRET, token)
            const { user_id } = result.value
            let user = await User.findOne({
                where: {
                    user_id: user_id
                }
            })
            req.currentUser = user
        }
        next()
    } catch (err) {
        req.currentUser = null
        next()
    }
}

module.exports = defineCurrentUser;