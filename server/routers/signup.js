const express = require("express")
const router = express.Router()
const { signUpRender } = require("../controller")
const { signUpValidator } = require("../validator/validator")


router.get("/", (req, res) => {
    res.send("Signup Page")
})
router.post("/", signUpValidator, signUpRender)


module.exports = router