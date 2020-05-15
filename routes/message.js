const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Message =mongoose.model("Message")

//to veiw all messages
router.get('./allMessages' ,requireLogin, (res,req)=>{
    Message.find()
    .populate("postedBy","_id name") //show the details of the user
    .then(messages=>{
        res.json({messages})
    })
    .catch(err=>{
        console.log(err)
    })
})

//to create a message
router.post('./createMessage' ,requireLogin, (req,res)=>{
    const {title , body} = req.body
    if(!title || !body){
        res.status(422).json({err:"please fill all field"})
        }
        req.user.password = undefined
         const message = new Message({
             title,
             body,
             postedBy: req.user
         })
         message.save().then(result=>{
             res.json({message:result})
         })
         .catch(err=>{
             console.log(err)
         })
})

//messages created by user
router.get('./myMessages',requireLogin,(req,res)=>{
    Message.find({postedBy:req.user._id}) //get all messages of the user who logged in
    .populate("postedBy","_id name") //show the details of the user
    .then(myMessage=>{
        res.json({myMessage})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports= router