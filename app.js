const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express()
const Port = 5000;
const {URL} = require('./config/keys')


require('./models/user')
app.use(express.json());   // parse application/json
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded\
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(require('./routes/auth'))



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

app.listen(Port, ()=>{
    console.log("server is connected" , Port)
})
