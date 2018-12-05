const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')

const port = process.env.PORT || 3030

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.send('Welcome to the Emergency Operation Unit, how can we help you ?')
})

app.post('/', (req, res) => {
  let {sessionId, serviceCode, phoneNumber, text} = req.body
  let name = "";
  let address = "";
  let details = "";
  let textValue = text.split('*').length;
  console.log(req.body);

  let message = "";
  if(text == ''){
    message = `CON Welcome to EOU, how can we help you today  ?`
    console.log(req.body);
  }
  else if(textValue == 1){
     message = "CON Please kindly tell us your name . "
     name = text;
  }

  else if(textValue == 2){
    message = "CON Please Kindly tell us the address of the emergency "
    address = text;
  }

  else if(textValue == 3){
    message = "CON please describe briefly the situation on ground."
    details = text;
  }
  else{
    message = "END Thank you for getting in touch with us . ";
  }

  res.send(message);
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})