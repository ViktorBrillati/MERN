const bcrypt = require('bcrypt');
const User = require('../models/User.js');

module.exports = async (req, res) => {
    try {
        const { username, password } = req.body
        await User.findOne({ username: username });
        if (user) {
            bcrypt.compare(password, user.password, (same) => {
                if (same) {
                    res.redirect('/');
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.redirect('/auth/login');
    }
}
