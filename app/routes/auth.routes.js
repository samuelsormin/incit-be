const controller = require("../controllers/auth.controller")
const { checkSchema } = require("express-validator")

const signUpSchema = require("../schemas/signup.schema")

module.exports = function (app) {
    app.use(function (_, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/auth/signup", checkSchema(signUpSchema), controller.signup);
};
