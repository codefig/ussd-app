const express = require('express')
const app = express()
const bodyparser = require('body-parser');
const db = require('mongoose');

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.json());



const PORT = process.env.PORT || 3000

app.get('/', function(req, res, next){
    console.log("The index function");
    res.send("Welcome to Traffic-Not");
})


app.listen(PORT, function(){
    console.log(`Application served on : ${PORT}`)
})