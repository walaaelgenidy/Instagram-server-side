const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

  name: {
   type: String,
   lowercase: true,
   unique: true,
   required: [true, "please enter your name"],
   
  },

  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "please enter your email"],
  },

  password: {
      type: String,
      required: true
  }
  
})
//USER MODEL
const User =mongoose.model('User',userSchema);

module.exports = User;