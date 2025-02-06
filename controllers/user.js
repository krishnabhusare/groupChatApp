const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function tokenGenerator(id, name) {
    return jwt.sign({ userId: id, name: name }, 'secreteKey');
}

const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ msg: 'signup success' });

    } catch (err) {
        res.status(500).json({ hint: 'signup failed', err })
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findAll({ where: { email } });
        if (user.length == 1) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    return res.status(201).json({ user, token: tokenGenerator(user[0].id, user[0].name) })
                }
                else {
                    return res.status(401).json({ msg: 'password incorect' });
                }
            })
        }
        else {
            return res.status(404).json({ msg: 'user not found' });
        }

    } catch (err) {
        res.status(500).json({ msg: 'failed while login', err })
    }
}


module.exports = {
    signup,
    login
}

