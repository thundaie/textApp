const bcrypt = require("bcryptjs")
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  usename: {
    type: String,
    required: true,
    min: 3,
    max: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 100,
  },
});


userSchema.pre("save", async function(next) {
    this.password = bcrypt.hash(this.password, 10)
    next()
})



userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model("userData", userSchema);
