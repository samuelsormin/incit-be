const db = require("../models");
const User = db.user;

const { body, checkSchema, validationResult } = require('express-validator');

checkDuplicateEmail = async (req, res, next) => {
    try {
        // Email
        user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (user) {
            return res.status(400).send({
                success: false,
                message: "Failed! Email is already in use!"
            });
        }

        next();
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Unable to validate email!"
        });
    }
};

const verifySignUp = {
    checkDuplicateEmail
};

module.exports = verifySignUp;
