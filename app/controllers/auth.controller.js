const db = require("../models");
const User = db.user;

const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const sendEmail = require("../helper/sendEmail")

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

        // send email
        const payload = {
            receiver: req.body.email,
            subject: "Congratulations, you have successfully registered",
            text: `You have successfully registered. Your email is ${req.body.email}`,
            html: `<div style="padding:10px;text-align:center;"><h1>You have successfully registered.</h1><h2>Your emails is ${req.body.email}</h2></div>`
        }

        await sendEmail(payload).catch(console.error);

        res.status(200).json({
            success: true,
            message: 'Registration successful',
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
