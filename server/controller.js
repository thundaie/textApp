const userModel = require("./model/userModel")
const jwt = require("jsonwebtoken")
require("dotenv").config()

//Enviroment variable
const JWT_TOKEN = process.env.JWT_TOKEN


const token = async (username) => {
    return jwt.sign({ username }, JWT_TOKEN, {
        expiresIn: "1hr"
    })

}

async function signUpRender (req, res) {
    const { username, email, password } = req.body
    const bodyPayload = { username, email, password }

    const emailCheck = await userModel.find({ email: email })
   try {
    if(emailCheck){
        res.json({
            message: "This email address has been registered to another user, Please input another unique address"
        })
    }
    if(!email || !username || !password){
        res.json({
            message: "Please input all relevant fields"
        })
    }
    const newUser = new userModel(bodyPayload)
    await newUser.save()

    const generatedToken = token(username)

    res.json({
        message: `User created successfully, \n
        Welcome ${username}`,

        generatedToken

    })
    

   } catch (error) {
    console.log(error)
    res.status(500).json({
        message: "An error occured while trying to create new user"
    })
   }
}

    async function signInRender(req, res) {
        const { username, password } = req.body
        const bodyPayload = { username, password }

        try {
            if(!username || !password){
                res.json({
                    message: "Please input all relevant fields"
                })}

            let userFound = await userModel.find({ username: username })
    
            if(!userFound || !userModel.comparePassword(password)){
                res.json({
                    message: "Incorrect username or passsword"
                })
            }

            const generatedToken = token(username)

            res.status(200).json({
                message: "Login successful",

                generatedToken
            })


            
        }
        catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Internal Server error"
            })
        }

    }




module.exports = {
    signInRender,
    signUpRender
}