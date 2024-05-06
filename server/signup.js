const express = require("express")
const router = express.Router()
const { signUpRender } = require("./controller")



router.get("/", (req, res) => {
    res.send("Signup Page")
})
router.post("/", signUpRender)


module.exports = router