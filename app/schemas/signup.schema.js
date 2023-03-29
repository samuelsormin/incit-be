const db = require("../models");
const User = db.user;

module.exports = {
    email: {
        normalizeEmail: true,
        isEmail: {
            errorMessage: "Invalid email"
        },
        custom: {
            options: value => {
                return User.findOne({
                    where: {
                        email: value
                    }
                }).then(user => {
                    if (user) {
                        return Promise.reject("Email is already in use!")
                    }
                })
            }
        }
    },
    "password": {
        isStrongPassword: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        },
        errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one special character, and one number",
    },
    "confirm_password": {
        custom: {
            options: (value, { req }) => {
                if (value !== req.body.password)
                    throw new Error("Password confirmation does not match with password.")
                return value
            }
        },
    }
}
