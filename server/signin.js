const express = require("express")
const router = express.Router()
const { signInRender } = require("./controller")


router.get("/", (req, res) => {
    res.send("LogIn Page")
})
router.post("/", signInRender)

module.exports = router