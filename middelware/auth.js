const jwt = require('jsonwebtoken');
const User = require('../models/user');


const authenticate = async (req, res, next) => {
    try {

        const token = req.headers.authorization;


        const decreptedToken = jwt.verify(token, 'secreteKey');
        const user = await User.findByPk(decreptedToken.userId);
        if (user) {
            req.user = user;
            next();
        } else {
            return res.status(400).json({ msg: 'this user not have authority ' });
        }

    } catch (err) {
        res.status(500).json({ msg: 'failed while authenticate', err });
    }
}

module.exports = { authenticate };