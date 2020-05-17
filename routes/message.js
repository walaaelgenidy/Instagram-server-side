const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Message =mongoose.model("Message")

//to veiw all messages
router.get('/allMessages' ,requireLogin, (res,req)=>{
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
router.post('/CreateMessage' ,requireLogin, (req,res)=>{
    const {title , body,pic} = req.body
    if(!title || !body || !pic){
        res.status(422).json({err:"please fill all field"})
        }
        req.user.password = undefined
         const message = new Message({
             title,
             body,
             photo:pic,
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
router.get('/myMessages',requireLogin,(req,res)=>{
    Message.find({postedBy:req.user._id}) //get all messages of the user who logged in
    .populate("postedBy","_id name") //show the details of the user
    .then(myMessage=>{
        res.json({myMessage})
    })
    .catch(err=>{
        console.log(err)
    })
})


//to make a reply
router.put('/reply',requireLogin,(req,res)=>{
    const reply = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Message.findByIdAndUpdate(req.body.mesaageId,{
        $push:{replies:reply}
    },{
        new:true
    })
    .populate("replies.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

 //to delete a message
router.delete('/deletemessage/:mesaageId',requireLogin,(req,res)=>{
    Message.findOne({_id:req.params.mesaageId})
    .populate("postedBy","_id")
    .exec((err,message)=>{
        if(err || !message){
            return res.status(422).json({error:err})
        }
        if(message.postedBy._id.toString() === req.user._id.toString()){
              message.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})
module.exports= router