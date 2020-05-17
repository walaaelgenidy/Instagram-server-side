const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express()
const Port = 5000;
// const {URL} = require('./config/keys')

const URL =  "mongodb+srv://walaa:<2ptsqUcY9PMMH6Lq>@cluster0-xmvda.mongodb.net/test?retryWrites=true&w=majority";
  
//mongo connections
try {
    mongoose.connect( URL,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,}, () =>
    console.log("connected"));    
    }catch (error) { 
    console.log("could not connect");    
    }
//102.44.71.216

require('./models/user')
require('./models/message')

app.use(express.json());   // parse application/json
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded\
//app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.use(require('./routes/auth'))
app.use(require('./routes/message'))


app.listen(Port, ()=>{
    console.log("server is connected" , Port)
})
