const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const logger = require('morgan')
const path  = require('path')
const socket = require('socket.io')

const port = process.env.PORT || 3030

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.static('./static'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  // res.send('Welcome to the Nigerian Counter-Terrorism Unit, how can we help you ?')
  // req.sendFile('index.html');
  res.send("Welcome home");
})

app.post('/', (req, res) => {
  let {sessionId, serviceCode, phoneNumber, text} = req.body
  let name = "";
  let userLocation = "";
  let distressLocation = "";
  let details = "";
  let textValue = text.split('*').length;
  console.log(req.body);

  let message = "";
  if(text == ''){
    message = `CON Welcome to Nigerian Anti-Terrorism Unit, Please enter your name to continue?`
    console.log(req.body);
  }
  else if(textValue == 1){
    name = text;
    message = "CON Please kindly tell us your location."
  }
  else if(textValue == 2){
    userLocation = text.split('*')[1];
    message = "CON Please Kindly tell us the address of the distress"
  }

  else if(textValue == 3){
    distressLocation = text.split('*')[2];
    message = "CON please describe briefly the situation on ground."
  }
  else if(textValue == 4){
    details = text.split('*')[3];
    message = `END Thanks ${name} We would gladly respond to this distress soon`;
  }
  else{
    message = "END Thank you for getting in touch with us . ";
  }

  res.send(message);
})

let server = app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

let io = socket(server)
io.on('connection', function(socket){
  console.log("made socket connection");
  io.emit('message', {
    message : "How are you", 
    name : "If"
  });
})