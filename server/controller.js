const userModel = require("./model/userModel")


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
    newUser.save()
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

            res.status(200).json({
                message: "Login successful"
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