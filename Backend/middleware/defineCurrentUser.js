const db = require("../models");
const jwt = require('jsonwebtoken');

const { User } = db;

async function defineCurrentUser(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const { user_id } = decoded;
            const user = await User.findOne({ where: { user_id: user_id } });
            req.currentUser = user;
        } else {
            req.currentUser = null;
        }
        next();
    } catch (err) {
        req.currentUser = null;
        next(err);
    }
}

module.exports = defineCurrentUser;