const joi = require("joi")


const signUp = joi.object({
    username: joi.string()
        .required()
        .min(1)
        .max(30)
        .trim(),
    email: joi.string()
        .required()
        .trim(),
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
})

const logIn = joi.object({
    username: joi.string()
        .required()
        .min(1)
        .max(30)
        .trim(),
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
})


const signUpValidator = async (req, res, next) => {
    const { username, email, password } = req.body
    const bodyPayload = { username, email, password }

    try {
        await signUp.validateAsync(bodyPayload)
        next()
    } catch (error) {
        res.json({
            message: "Please Input the correct values into the relevant fields"
        })
    }
}


const signInValidator = async (req, res, next) => {
    const { username, password } = req.body
    const bodyPayload = { username, password }

    try {
        logIn.validateAsync(bodyPayload)
        next()
    } catch (error) {
        res.json({
            message: "Please Input the correct values into the relevant fields"
        })
    }
}

module.exports = {
    signUpValidator,
    signInValidator
}