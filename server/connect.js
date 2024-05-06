const mongoose = require("mongoose")
require("dotenv").config()


const CONNECTION_URI = process.env.CONNECTION_URI

function connectDatabase(CONNECTION_URI){
    mongoose.connect(CONNECTION_URI)

    mongoose.connection.on("connected", () => {
        console.log("Database connection has been created successfully")
    })

    mongoose.connection.on("error", (error) => {
        console.log(error)
    })
}

module.exports = connectDatabase


