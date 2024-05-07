const express = require("express")
const app = express()
const cors = require("cors")
const helmet = require("helmet")
const limiter = require("express-rate-limiter")
require("dotenv").config()
const { connectDatabase } = require("./connect")
const signIn = require("./routers/signin6epd")
const signUp = require("./routers/signup")


const PORT = process.env.PORT || 2000


//calculating rateLimiter
const rateLimiter = limiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
})

//MiddleWare
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(helmet())
app.use(rateLimiter)

connectDatabase()


//Routers
app.use("/signup", signUp)
app.use("/signin", signIn)



app.listen(PORT, () => {
    console.log(`app is running on port: ${PORT}`)
})