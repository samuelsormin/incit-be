const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

app.get("/", (_, res) => {
    res.json({
        success: true,
        message: "Welcome to INCIT application."
    })
})

// sync database
const db = require("./app/models");

db.sequelize.sync().then(function () {
    console.log("Connected to database.");
}).catch(function (error) {
    console.log(error)
})

// routes
require('./app/routes/auth.routes')(app);

// serve & listen
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
