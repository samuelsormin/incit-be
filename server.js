const express = require("express")
const cors = require("cors")
const cookieSession = require("cookie-session")

const app = express()

app.use(cors())

// parse request of content-type application/json
app.use(express.json())

// parse request of content-type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.use(
    cookieSession({
        name: "incit-session",
        secret: "COOKIE_SECRET",
        httpOnly: true
    })
)

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to incit application."
    })
})


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
