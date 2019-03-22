const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const logger = require('morgan')
const path = require('path')
const mongoose = require('mongoose');

const Emergency = require('./connection/schema')

const port = process.env.PORT || 3030

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.static('./static'))
app.use(bodyParser.urlencoded({ extended: true }))

let username = process.env.USERNAME;
let password = process.env.PASSWORD;

console.log("this is username : " + username + password);
mongoose.connect("mongodb://"+ username +":" + password +"@ds147681.mlab.com:47681/playground")
  .then(function () {
    console.log("Database connected")
  }).catch(function (err) {
    console.log("Error Connection " + err);
  })


app.get('/getall', async function (req, res) {
  //this is where the index page fetches from 
  const results = await Emergency.find().select('-_id');
  console.log(results);
  res.send(results);
})

app.post('/', (req, res) => {
  let { sessionId, serviceCode, phoneNumber, text } = req.body
  let name = "";
  let userLocation = "";
  let distressLocation = "";
  let details = "";
  let textValue = text.split('*').length;

  let record = {
    name: "",
    userLocation: "",
    distressLocation: "",
    details: details
  }
  

  let message = "";
  if (text == '') {
    message = `CON Welcome to Traffic-Not, Fighting Human Traffic for all?`
    
  }
  else if (textValue == 1) {
    record.name = text;
    message = "CON Please kindly tell us your location."
  }
  else if (textValue == 2) {
    record.userLocation = text.split('*')[1];
    message = "CON Please Kindly tell us the address of the distress"
  }

  else if (textValue == 3) {
    record.distressLocation = text.split('*')[2];
    message = "CON please give us contacts on your guardian."
  }
  else if (textValue == 4) {
    record.details = text.split('*')[3];
    message = `END Thanks ${name} We would gladly respond to this distress soon`;
  }
  else {
    message = "END Thank you for getting in touch with us . ";
  }

  //set the record details 
  record.name = text.split('*')[0];
  record.userLocation = text.split('*')[1];
  record.distressLocation = text.split('*')[2];
  record.details = text.split('*')[3];


  if (record.name != undefined && record.userLocation != undefined && record.distressLocation != undefined && record.details != undefined) {

    let emergency = new Emergency({
      name: record.name,
      userLocation: record.userLocation,
      distressLocation: record.distressLocation,
      details: record.details,
    })

    emergency.save().then(function () {
      console.log("record saved")
    }).catch(function (err) {
      console.log("Error : " + err);
    })
  }

  res.send(message);

})

let server = app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
