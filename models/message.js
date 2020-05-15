const mongoose = require ('mongoose')
const {ObjectId} = mongoose.Schema.Types

const messageSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    postedBy:{
         type:ObjectId, //id for the user who made the message
         ref:"User"
    }
})

mongoose.model("Message" , messageSchema)