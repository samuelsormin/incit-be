const db = require("../models");
const User = db.user;

const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.signup = async (req, res) => {
    // Save User to Database
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        });

        res.status(200).json({
            success: true,
            message: 'Registration successful',
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
